<template>
  <div>
    <p>Your Coordinates: {{myCoordinates.lat}} Latitude, and {{myCoordinates.lng}} Longitude</p>
    <p>Map Coordinates: {{mapCoordinates.lat}} Latitude, and {{mapCoordinates.lng}} Longitude</p>
    <GmapMap
      :center="myCoordinates"
      :zoom="zoom"
      style="width:640px; height:360px"
      ref="mapRef"
      @dragend="handleDrag"
    ></GmapMap>
    <h1>Events</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
  </div>
</template>

<script>
import EventCard from "../components/EventCard";
export default {
  components: {
    EventCard
  },
  data() {
    return {
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0
      },
      zoom: 10
      // mapCoordinates: {
      //   lat: 0,
      //   lng: 0
      // }
    };
  },
  computed: {
    events() {
      return this.$store.getters.events;
    },
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0
        };
      } else {
        return {
          lat: this.map
            .getCenter()
            .lat()
            .toFixed(4),
          lng: this.map
            .getCenter()
            .lng()
            .toFixed(4)
        };
      }
    }
  },
  methods: {
    handleDrag() {
      //get center and zoom level, store in localstorage
      let center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      };
      let zoom = this.map.getZoom();

      localStorage.center = JSON.stringify(center);
      localStorage.zoom = JSON.stringify(zoom);
    }
  },
  created() {
    //does user have a saved center? use it instead of the default
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {
      //get user coordinates from browser
      this.$getLocation({})
        .then(coordinates => {
          this.myCoordinates = coordinates;
        })
        .catch(err => alert(err));
    }
    //does the user have a save zoom? use it instead of the default
    if (localStorage.zoom) {
      this.zoom = JSON.parse(localStorage.zoom);
    }
  },
  mounted() {
    //add the map to the data object
    this.$refs.mapRef.$mapPromise.then(map => {
      this.map = map;
    });
  }
};
</script>

<style>
</style>