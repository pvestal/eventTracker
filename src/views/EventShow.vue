<template>
  <div>
    <h1>Event Details</h1>
    <p>Id: {{event.id}}</p>
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