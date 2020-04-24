<template>
  <div>
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
      
    }
  },
  computed: {
      events() {
        return this.$store.getters.events
      },
  }

};
</script>

<style>
</style>