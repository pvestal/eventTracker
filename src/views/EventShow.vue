<template>
  <div id="container">
    <h1>Event Details</h1>
    <p>Id: {{event.id}} - Added: {{event.addedDate}}</p>
    <p>Location: {{event.location}}</p>
    <p>Description: {{event.description}}</p>
    <p>Organizer: {{event.organizer}}</p>
    <p>Status: {{event.status}}</p>
    <p>Start Date: {{event.startDate}} - End Date: {{event.endDate}}</p>
    <v-btn @click="deleteEvent" fab absolute right>
      <v-icon dark>mdi-delete</v-icon>
    </v-btn>
    <edit-event :event="event"></edit-event>
  </div>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    event() {
      return this.$store.getters.getEventById(this.id);
    }
  },
  methods: {
    deleteEvent() {
      let confirmDelete = confirm("Are you sure you want to delete?");
      if (confirmDelete) {
        this.$store.dispatch("deleteEvent", this.event.id);
        this.$router.push('/')
      } else {
        return;
      }
    }
  }
};
</script>

<style>
</style>