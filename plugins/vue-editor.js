import Vue from 'vue'
import Editor from 'vue-editor-js'
Vue.use(Editor)
// const editor = new Editor({
//     holderId: "editorjs",
//     tools: {
//         linkTool: {
//             class: LinkTool,
//             config: {
//                 endpoint: "http://localhost:8090/fetchUrl"
//             }
//         },

//         header: Header,
//         inlineCode: {
//             class: InlineCode,
//             shortcut: "CMD+SHIFT+M"
//         },
//         personality: {
//             class: Personality,
//             config: {
//                 endpoint: "http://localhost:8090/image"
//             }
//         },
//         checklist: {
//             class: Checklist,
//             inlineToolbar: true
//         },
//         list: {
//             class: List,
//             inlineToolbar: true
//         },

//         delimiter: Delimiter,

//         raw: RawTool,
//         code: CodeTool,
//         quote: Quote,
//         paragraph: {
//             class: Paragraph,
//             inlineToolbar: true
//         },

//         embed: {
//             class: Embed,
//             config: {
//                 services: {
//                     youtube: true,
//                     coub: true,
//                     codepen: {
//                         regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
//                         embedUrl:
//                             "https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2",
//                         html:
//                             "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
//                         height: 300,
//                         width: 600,
//                         id: groups => groups.join("/embed/")
//                     }
//                 }
//             }
//         },
//         table: {
//             class: Table
//         },
//         image: {
//             class: ImageTool,
//             config: {
//                 endpoints: {
//                     byFile: "http://localhost:8090/image",
//                     byUrl: "http://localhost:8090/image-by-url"
//                 }
//             }
//         },
//         Marker: {
//             class: Marker,
//             shortcut: "CMD+SHIFT+M"
//         },
//         warning: Warning
//     }
// });

