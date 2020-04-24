<template>
  <div>
    
    <h1>Event Details</h1>
    <router-link :to="{name: 'event-list'}">Back</router-link>
    <p>Id: {{event.id}}</p>
    <p>Added: {{event.addedDate}}</p>
    <p>Location: {{event.location}}</p>
    <p>Description: {{event.description}}</p>
    <p>Organizer: {{event.organizer}}</p>
    <p>Status: {{event.status}}</p>
  </div>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    event() {
      return this.$store.getters.getEventById(this.id);
    }
  }
};
</script>

<style>
</style>