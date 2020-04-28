<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="manageArticle"
    v-model="selected"
    sort-by="calories"
    class="elevation-1"
    show-select
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>文章管理</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
          <!-- <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>-->
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.title" label="title"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.type" label="type"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.comment" label="comment"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.collect" label="collect"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.like" label="like"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.see" label="see"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    search: '',
    selected: [],
    dialog: false,
    headers: [
      {
        text: '文章标题',
        align: 'start',
        sortable: false,
        value: 'title'
      },
      { text: '文章类型', value: 'type' },
      { text: '留言数量', value: 'comment' },
      { text: '收藏数量', value: 'collect' },
      { text: '喜欢数量', value: 'like' },
      { text: '阅读数量', value: 'see' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      title: '',
      type: '',
      comment: 0,
      collect: 0,
      like: 0,
      see: 0
    },
    defaultItem: {
      title: '',
      type: '',
      comment: 0,
      collect: 0,
      like: 0,
      see: 0
    }
  }),

  computed: {
    ...mapGetters({ manageArticle: 'manageArticle' }),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    selected(arr) {
      console.log(arr)
    },
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    // this.initialize()
  },

  methods: {
    ...mapMutations({ deletedata: 'content/deletedata' }),
    initialize() {},

    editItem(item) {
      this.editedIndex = this.manageArticle.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      confirm('Are you sure you want to delete this item?') &&
        // this.manageArticle.splice(index, 1)
        this.deletedata({ type: 'article', key: '_id', node: item.id })
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.manageArticle[this.editedIndex], this.editedItem)
      } else {
        this.manageArticle.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
