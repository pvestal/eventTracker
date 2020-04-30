<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn fab v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Edit Event - {{event.id}}
          <v-btn @click="dialog = false" x-small fab absolute right>
              <v-icon dark>mdi-close</v-icon>
          </v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field label="Location" v-model="editedLocation" :rules="inputRules" clearable></v-text-field>
        <v-text-field label="Description" v-model="editedDescription" :rules="inputRules" clearable></v-text-field>
        <v-select v-model="editedOrganizer" :items="organizers" label="Organizer" clearable></v-select>
        <v-select v-model="editedStatus" :items="statusOptions" label="Status" clearable></v-select>
        <v-dialog
          ref="startDateDialog"
          v-model="startDateModal"
          :return-value.sync="editedStartDate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="editedStartDate"
              label="Event Start Date"
              prepend-icon="mdi-calendar"
              readonly
              clearable
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="editedStartDate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startDateModal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.startDateDialog.save(editedStartDate)">OK</v-btn>
          </v-date-picker>
        </v-dialog>

        <v-dialog
          ref="endDateDialog"
          v-model="endDateModal"
          :return-value.sync="editedEndDate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="editedEndDate"
              label="Event End Date"
              prepend-icon="mdi-calendar"
              readonly
              clearable
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="editedEndDate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endDateModal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.endDateDialog.save(editedEndDate)">OK</v-btn>
          </v-date-picker>
        </v-dialog>

        <v-card-actions>
          <v-btn @click="dialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="update" :loading="loading">Update</v-btn>
          
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// import format from 'date-fns/format'
export default {
  name: "editEvent",
  props: ["event"],
  data() {
    return {
      dialog: false,
      organizers: ["Karla", "Patrick"],
      statusOptions: ["Pending", "Approved"],
      menu: false,
      editedDue: "",
      startDateModal: false,
      endDateModal: false,
      editedLocation: this.event.location,
      editedDescription: this.event.description,
      editedOrganizer: this.event.organizer,
      editedStatus: this.event.status,
      editedStartDate: this.event.startDate,
      editedEndDate: this.event.endDate,
      inputRules: [
        v => !!v || "This field is required",
        v => (v && v.length >= 3) || "Minimum Length is 3 Characters"
      ],
      feedback: null,
      loading: false,
      loader: null
    };
  },
  methods: {

    update() {
      this.loading = true;
      const updatedData = {
        id: this.event.id,
        location: this.editedLocation,
        description: this.editedDescription,
        organizer: this.editedOrganizer,
        status: this.editedStatus,
        startDate: this.editedStartDate,
        endDate: this.editedEndDate
      };
      this.$store.dispatch("updateEvent", updatedData);
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>