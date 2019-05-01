#include <ESP8266WiFi.h>
//#include "DHT.h"
//#define DHTPIN 2     // what digital pin we're connected to
//#define DHTTYPE DHT11   // DHT 11
//DHT dht(DHTPIN, DHTTYPE);
#include "ThingSpeak.h"
#define TRIGGER_PIN  2
#define ECHO_PIN     0
 
const char* ssid = "Dew";
const char* password = "25127301";
const char * myWriteAPIKey = "1FC56B5RKE0V8JWQ";
unsigned long myChannelNumber = 764734; //add your thingspeak channel number
const char* server = "api.thingspeak.com";
WiFiClient client;

void setup() {
//  Serial.begin(9600);      // PC Arduino Serial Monitor
  Serial.begin(115200);     // Arduino to ESP01 Communication
  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(BUILTIN_LED, OUTPUT);
//  delay(10000);
//  Serial.println("DHTxx test!");
//  dht.begin();
  Serial.println("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  ThingSpeak.begin(client);
      while (WiFi.status() != WL_CONNECTED) 
     {
            delay(250);
            Serial.print(".");
     }
      Serial.println("");
      Serial.println("WiFi connected");
 
}

void loop() {
  // put your main code here, to run repeatedly: 
    long duration, distance;
    digitalWrite(TRIGGER_PIN, LOW);  // Added this line
    delayMicroseconds(2); // Added this line
    digitalWrite(TRIGGER_PIN, HIGH);
    delayMicroseconds(10); // Added this line
    digitalWrite(TRIGGER_PIN, LOW);
    duration = pulseIn(ECHO_PIN, HIGH);
    distance = (duration/2) / 29.1;
    Serial.print(distance);
    Serial.println(" cm");
    
    Serial.println("....writing to Thingspeak...");
    if (client.connect(server, 80)) {
      Serial.println("Connected to thingspeak");
      ThingSpeak.setField(6, distance);
//      ThingSpeak.setField(2, h);
      ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
    delay(10000);
  }
}
