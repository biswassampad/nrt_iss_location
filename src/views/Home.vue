<template>
<div>
  <div class="home" v-if="locations">
     <MglMap :accessToken="accessToken" :mapStyle="mapStyle"  @load="onMapLoaded">
       <MglMarker :coordinates="locations" color="blue" v-if="locations"/>
     </MglMap>
   </div>
   <div class="home">
     <h1>Iss Realtime location Finder</h1>
   </div>
   </div>
</template>

<script>
// @ is an alias to /src
import Mapbox from "mapbox-gl";
import { MglMap ,MglMarker} from "vue-mapbox";

export default {

  name: 'Home',
  components: {
     MglMap,MglMarker
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiYmlzd2Fzc2FtcGFkMDEiLCJhIjoiY2tvNzU3bGxwMXNvajJwbHAwczBxNmM2dSJ9.VEVNn8tC2dsf4-B8yQC4gA', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/mapbox/streets-v11' ,// your map style
    };
  },
  computed:{
    locations(){
       var loc =  this.$store.getters.getCurrentLocation
        if(loc.length >1){
          return loc
        }
      }
  },
  mounted(){
    this.interval = setInterval(() => {
       var location = this.$store.dispatch('setCurrentLocation');
    }, 2000);
  },
  created(){
    this.mapbox = Mapbox;
  },
  methods:{
       async onMapLoaded(event) {
      // in component
      this.map = event.map;
      // or just to store if you want have access from other components
      // this.$store.map = event.map;
      const asyncActions = event.component.actions

      const newParams = await asyncActions.flyTo({
        center: this.locations,
        zoom: 4,
        speed: 1
      })
      console.log(newParams)
    }
  },
  
}
</script>
<style>
.home{
  border:1px solid black;
  height:98vh;
}
</style>