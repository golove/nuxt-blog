<template>
  <v-card color="transparent" flat justify-center>
    <div class="box" :class="falg?'forstyel':'nomore'">
      <v-avatar
        :size="size"
        hover
        :key="i"
        class="ma-4"
        @click="imgsrcicon(e)"
        v-for="(e,i) in items"
      >
        <img ref="box" alt="Avatar" @click="borderfunc(i)" :src="e.url?e.url:e" />
      </v-avatar>
    </div>
    <v-card-actions class="py-0">
      <v-spacer></v-spacer>

      <v-btn icon @click="falg = !falg">
        <v-icon>{{ falg ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="falg">
        <!-- <v-divider></v-divider> -->

        <v-card-text>
          <!-- I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape. -->
        </v-card-text>
      </div>
    </v-expand-transition>
    <!-- <v-btn @click="falg = !falg" icon>
      <v-icon>{{ falg ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
    </v-btn>-->
  </v-card>
</template>

<script>
export default {
  name: 'avatar',
  props: { items: Array, size: String },
  data: () => ({
    falg: false,
    imgflag: false,
    staty: Number
  }),
  methods: {
    imgsrcicon(e) {
      this.$emit('imgclick', e)
    },
    borderfunc(i) {
      // console.log(this.$refs.box[i])
      // this.$refs.box.[i]

      this.staty = i
    }
  }
}
</script>

<style>
.imgactived {
  border: 3px rgba(0, 174, 255, 0.5) solid;
}
.box {
  justify-content: center;
  /* transition: all 3.3s; */
}
.nomore {
  height: 50px;
  overflow: hidden;
}
.forstyel {
  height: auto;
}
</style>