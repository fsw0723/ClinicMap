<template>
  <gmap-map
    :center="center"
    :zoom="zoom"
    style="width: 100%; height: 500px"
  >
    <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" :content="infoContent" @closeclick="infoWinOpen=false"></gmap-info-window>
    <gmap-marker v-for="(m,i) in markers" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>
  </gmap-map>
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
        center: {lat: 1.29, lng: 103.82},
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
      this.getLocation()
      this.readClinicFile()
    },
    methods: {
      getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.center = {lat: position.coords.latitude, lng: position.coords.longitude}
            this.zoom = 13
          })
        } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      },
      readClinicFile() {
        var rawFile = new XMLHttpRequest();
        var vm = this;
        rawFile.open("GET", '../../static/output.csv', false);
        rawFile.onreadystatechange = function ()
        {
          if(rawFile.readyState === 4)
          {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
              parse(rawFile.responseText, function(err, output){
                vm.processFile(output)
                vm.addMarkersToMap()
              });
            }
          }
        }
        rawFile.send(null);
      },
      processFile(input) {
        input.forEach(line => {
          console.log(line)
          this.clinics.push({
            code: line[2],
            name: line[3],
            address: line[4],
            postal: line[5],
            tel: line[6],
            fax: line[7],
            weekday: line[8],
            sat: line[9],
            sun: line[10],
            pb: line[11],
            remark: line[12],
            lat: Number(line[13]),
            lng: Number(line[14])
          })
        })
      },
      addMarkersToMap() {
        let vm = this
        vm.clinics.forEach(clinic => {
          vm.markers.push({
            position: {lat: clinic.lat, lng: clinic.lng},
            infoText: `<div><b> ${clinic.name}</b></div>` +
            `<div>Address: ${clinic.address}</div>` +
            `<div>Postal code: ${clinic.postal}</div>` +
            `<div>Tel: ${clinic.tel}</div>` +
            `<div>Fax: ${clinic.fax}</div>` +
            `<div>Opening hours: </div>` +
            `<div>Mon - Fri: ${clinic.weekday}</div>` +
            `<div>Sat: ${clinic.sat}</div>` +
            `<div>Sun: ${clinic.sun}</div>` +
            `<div>Public holiday: ${clinic.pb}</div>`
          })

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
