<template>
  <gmap-map
    :center="center"
    :zoom="7"
    style="width: 500px; height: 300px"
  >
    <gmap-marker
      v-for="m in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
</template>

<script>
  import * as VueGoogleMaps from 'vue2-google-maps';
  import Vue from 'vue';

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'key'
      // libraries: 'places', //// If you need to use place input
    }
  });

  export default {
    name: 'hello',
    data () {
      return {
        center: {lat: 1.29, lng: 103.82},
        markers: [],
        clinics: []
      }
    },
    mounted () {
      this.readClinicFile()

    },
    methods: {
      readClinicFile() {
        var rawFile = new XMLHttpRequest();
        var vm = this;
        rawFile.open("GET", '../../static/test.csv', false);
        rawFile.onreadystatechange = function ()
        {
          if(rawFile.readyState === 4)
          {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
              var allText = rawFile.responseText.split('~~~')
              vm.processFile(allText)
              vm.addMarkersToMap()
            }
          }
        }
        rawFile.send(null);
      },
      processFile(input) {
        for (var i = 1; i < input.length-1; i++) {
          let line = input[i].split(',')
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
            remark: line[12]
          })
        }
      },
      addMarkersToMap() {
        let vm = this
        VueGoogleMaps.loaded.then(function() {
          let geocoder = new google.maps.Geocoder()
          vm.clinics.forEach(function(clinic) {
            geocoder.geocode( { 'address': clinic.address}, function(results, status) {
              if (status == 'OK') {
                let lat = results[0].geometry.location.lat()
                let lng = results[0].geometry.location.lng()
                vm.markers.push({position: {lat: lat, lng: lng}})
              } else {
                console.log(clinic.address, 'Geocode was not successful for the following reason: ' + status);
              }
            });
          })

        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
