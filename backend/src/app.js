const mqtt = require('mqtt');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

// --- KONFIGURASI ---
const MQTT_URL = 'mqtt://192.168.1.5:1883'; 
const INFLUX_CONFIG = {
  url: 'http://localhost:8086',
  token: 'MuHspxkkr4sWz4I1oyePWbsdQrrpx5VdhAPs8R3d9KwidLmWuP0Felk_nW0SvySb4cfS7l819HivL7xpxHN6sA==',
  org: 'myorg',
  bucket: 'iot_bucket'
};

// --- KONEKSI ---
const mqttClient = mqtt.connect(MQTT_URL);
const influxClient = new InfluxDB({ url: INFLUX_CONFIG.url, token: INFLUX_CONFIG.token });
const writeApi = influxClient.getWriteApi(INFLUX_CONFIG.org, INFLUX_CONFIG.bucket);

// --- LOGIKA TERIMA DATA ---
mqttClient.on('connect', () => {
  console.log('Terhubung ke MQTT Broker');
  // Subscribe ke topik spesifik lebih aman daripada '#'
  mqttClient.subscribe(['esp32/sensor', 'esp32/status'], (err) => {
    if (!err) console.log('Mendengarkan topik sensor & status...');
  });
});

mqttClient.on('message', (topic, message) => {
  const payload = message.toString();

  // 1. Logika untuk STATUS (ONLINE/OFFLINE)
  // 1. Logika untuk STATUS (ONLINE/OFFLINE)
  if (topic === 'esp32/status') {
    console.log(`Device Status: ${payload}`);
    const statusPoint = new Point('device_status')
      .tag('device', 'esp32_01')
      .stringField('state', payload.toUpperCase()); // Pastikan huruf besar semua agar mapping di Grafana mudah
    
    writeApi.writePoint(statusPoint);
    writeApi.flush(); 
    return; 
  }

  // 2. Logika untuk DATA SENSOR (JSON)
  if (topic === 'esp32/sensor') {
    try {
      const data = JSON.parse(payload);
      
      // Pastikan data valid sebelum ke Influx
      if (data.temp !== undefined && data.humi !== undefined) {
        console.log(`Data dari ESP32: Temp: ${data.temp}, Humi: ${data.humi}`);

        const point = new Point('sensor_data')
          .tag('device', 'esp32_01')
          .floatField('temperature', parseFloat(data.temp))
          .floatField('humidity', parseFloat(data.humi));
        
        writeApi.writePoint(point);
        writeApi.flush()
          .then(() => console.log('Berhasil ke InfluxDB'))
          .catch(err => console.error('InfluxDB Error:', err));
      }
    } catch (e) {
      console.log("Gagal parsing JSON:", payload);
    }
  }
});

// --- LOGIKA KONTROL (UNTUK SMARTPHONE) ---
app.post('/control', (req, res) => {
  const { action } = req.body; 
  mqttClient.publish('esp32/control/relay', action);
  console.log(`🎮 Mengirim perintah: ${action}`);
  res.send({ status: `Perintah ${action} terkirim!` });
});

app.listen(3000, () => console.log('Backend API jalan di port 3000'));