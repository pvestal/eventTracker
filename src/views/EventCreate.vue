<template>
  <div id="app">
    <v-app id="inspire">
      <v-form>
        <v-container>
          <v-row>
            <!-- <v-text-field
              v-model="id"
              @click="getId()"
              label="Click for ID"
              readonly
              clearable
              prepend-icon="mdi-gesture-tap-button"
            ></v-text-field> -->
          </v-row>
          <v-row>
            <v-col>
              <v-select v-model="organizer" :items="organizers" label="Organizer" clearable></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Link to input for google map search</p>
              <v-text-field v-model="location" label="Event Location" clearable></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea v-model="description" name="description" label="Event Description" clearable></v-textarea>
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col>
              <v-dialog
                ref="dialog1"
                v-model="startDateModal"
                :return-value.sync="startDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="startDate"
                    label="Event Start Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="startDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="startDateModal = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog1.save(startDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col>
              <v-dialog
                ref="dialog2"
                v-model="endDateModal"
                :return-value.sync="endDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="endDate"
                    label="Event End Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="endDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="endDateModal = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog2.save(endDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row> -->
          <v-row>
            <v-btn class="mr-4" color="primary" @click="createEvent">submit</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-app>
  </div>
</template>

<script>
// import addMarker from '../components/AddMarker'

export default {
  components: {
    // addMarker
  },
  data: () => ({
    startDateModal: false,
    endDateModal: false,
    id: "",
    organizer: "",
    organizers: ["Karla", "Patrick"],
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    addedDate: new Date().toISOString().substr(0, 10),
    status: "Pending",
    attendees: []
  }),
  methods: {
    createEvent() {
      console.log("fired");
      const event = {
        // id: this.id,
        organizer: this.organizer,
        description: this.description,
        location: this.location,
        startDate: this.startDate,
        endDate: this.endDate,
        addedDate: this.addedDate,
        attendees: this.attendees,
        status: this.status
      };
      this.$store
        .dispatch("addEvent", event)
        .then(() =>
          // this.$router.push({ name: "event-show", params: { id: this.id } })
          this.$router.push('/')
        )
        .catch(error => console.log(error));
    },
    getId() {
      this.$store
        .dispatch("getId")
        .then(res => (this.id = res.id))
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>