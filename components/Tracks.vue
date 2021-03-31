<template>
  <div class="mt-10">
    <table class="table-fixed">
      <thead>
        <tr class="text-coolGray-100 uppercase">
          <th :class="tracks[0].album ? 'w-24' : 'w-1/12'" class="font-medium text-left">#</th>
          <th :class="tracks[0].album ? 'w-4/12' : 'w-11/12'" class="font-medium text-left">Title</th>
          <th class="font-medium text-left" v-if="tracks[0].album">Album</th>
        </tr>
      </thead>
      <tbody class="text-coolGray-100 border-transparent border-t-2 leading-loose">
        <tr v-for="(item,i) in tracks" :key="item.i">
          <td>{{i}}</td>
          <td>{{item.name}}</td>
          <td class="hover:text-green-500" v-if="tracks[0].album">
            <NuxtLink :to="`/albums/${item.album.id}`">
              {{item.album.name}}
            </NuxtLink>
          </td>
          <td>{{item.duration}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props:{
    tracks: Array
  }
}
</script>
