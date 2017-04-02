<template>
  <div class="body">
    <div class="loading" v-if="loading"><h2>Loading...</h2></div>
    <h1>{{viewType}} MAP</h1>
    <div class="options">
      <input type="radio" id="clinic" value="clinic" v-model="viewType" v-on:change="readClinicFile">
      <label for="clinic">Clinic</label>
      <input type="radio" id="dental" value="dental" v-model="viewType" v-on:change="readClinicFile">
      <label for="dental">Dental</label>
      <br>
      <button v-on:click="getCurrentLocation">Show my current position</button>
    </div>
    <gmap-map
      :center="center"
      :zoom="zoom"
      style="width: 100%; height: 600px"
    >
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" :content="infoContent" @closeclick="infoWinOpen=false"></gmap-info-window>
      <gmap-marker v-for="(m,i) in markers" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>
    </gmap-map>
  </div>

</template>

<script>
  import * as VueGoogleMaps from 'vue2-google-maps';
  import Vue from 'vue';
  import parse from 'csv-parse';

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'key'
    }
  });

  export default {
    name: 'hello',
    data () {
      return {
        loading: false,
        viewType: 'clinic',
        center: {lat: 1.4017128, lng: 103.793967},
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        zoom: 11,
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoWinOpen: false,
        infoContent: '',
        currentMidx: null,
        markers: [],
        clinics: []
      }
    },
    mounted () {
      this.readClinicFile()
    },
    methods: {
      getCurrentLocation() {
        if (navigator.geolocation) {
          this.loading = true;
          navigator.geolocation.getCurrentPosition((position) => {
            this.center = {lat: position.coords.latitude, lng: position.coords.longitude}
            this.zoom = 16
            this.loading = false;
          })
        } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      },
      readClinicFile() {
        var rawFile = new XMLHttpRequest();
        var vm = this;
        rawFile.open("GET", `../../static/${vm.viewType}.csv`, false);
        rawFile.onreadystatechange = function ()
        {
          if(rawFile.readyState === 4)
          {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
              parse(rawFile.responseText, {columns: true, trim: true}, function(err, output){
                vm.processFile(output)
                vm.addMarkersToMap()
              });
            }
          }
        }
        rawFile.send(null);
      },
      processFile(input) {
        this.clinics = []
        input.forEach(line => {
          this.clinics.push(line)
        })
      },
      addMarkersToMap() {
        let vm = this
        vm.markers = []
        vm.clinics.forEach(clinic => {
          if(vm.viewType === 'clinic') {
            vm.markers.push({
              position: {lat: Number(clinic["LAT"]), lng: Number(clinic["LNG"])},
              infoText: `<div><b> ${clinic["CLINIC"]}</b></div>` +
              `<div>Address: ${clinic["ADDRESS"]}</div>` +
              `<div>Postal code: ${clinic["POSTAL"]}</div>` +
              `<div>Tel: ${clinic["TEL"]}</div>` +
              `<div>Fax: ${clinic["FAX"]}</div>` +
              `<div>Opening hours: </div>` +
              `<div>Mon - Fri: ${clinic["OPERATING HOURS MON - FRI"]}</div>` +
              `<div>Sat: ${clinic["SAT"]}</div>` +
              `<div>Sun: ${clinic["SUN"]}</div>` +
              `<div>Public holiday: ${clinic["PUBLIC HOLIDAY"]}</div>`
            })
          } else {
            vm.markers.push({
              position: {lat: Number(clinic["LAT"]), lng: Number(clinic["LNG"])},
              infoText: `<div><b> ${clinic["CLINIC NAME"]}</b></div>` +
              `<div>Address: ${clinic["ADDRESS"]}</div>` +
              `<div>Tel: ${clinic["TEL"]}</div>` +
              `<div>Opening hours: </div>` +
              `<div>Mon - Fri: ${clinic["WEEKDAYS"]}</div>` +
              `<div>${clinic["SAT/SUN/PH"]}</div>`
            })
          }
        })
      },
      toggleInfoWindow: function(marker, idx) {
        this.infoWindowPos = marker.position;
        this.infoContent = marker.infoText;
        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      }
    }
  }
</script>

<style scoped>
  h1 {
    text-transform: uppercase;
  }

  .options {
    text-align: right;
    margin-bottom: 24px;
  }

  button {
    margin-top: 12px;
  }

  .body {
    max-width: 1200px;
    margin: 0 auto;
  }

  .loading {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
</style>
