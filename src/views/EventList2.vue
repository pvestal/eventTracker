
<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <td>Click to sort</td>
          <td>Total: {{eventsCount}}</td>
        </tr>
        <tr>
          <th class="text-left" @click="sortBy('location')">Location</th>
          <th class="text-left" @click="sortBy('organizer')">Person</th>
          <th class="text-left" @click="sortBy('addedDate')">Added Date</th>
          <th class="text-left" @click="sortBy('status')">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.name" @click="goHere(event.id)" >
          <td>{{ event.location }}</td>
          <td>{{ event.organizer }}</td>
          <td>{{ event.addedDate }}</td>
          <td>{{ event.status }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
// import format from 'date-fns/format'
export default {
  name: "Event-View2",
  data() {
    return {};
  },
  methods: {
    sortBy(property) {
      this.events.sort((a, b) => (a[property] < b[property] ? -1 : 1));
    },
    goHere(id) {
      this.$router.push({name: 'event-show', params: {id}})
    }
  },
  computed: {
    events() {
      return this.$store.getters.events;
    },
    eventsCount() {
      return this.$store.getters.eventsCount;
    }
  }
};
</script>

<style scoped>
.event.complete {
  border-left: 4px solid #3cd1c2;
}
.event.ongoing {
  border-left: 4px solid orange;
}
.event.overdue {
  border-left: 4px solid tomato;
}
.v-chip.complete {
  background: #3cd1c2;
}
.v-chip.ongoing {
  background: #ffaa2c;
}
.v-chip.overdue {
  background: #f83e70;
}
</style>