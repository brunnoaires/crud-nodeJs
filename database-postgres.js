import { randomUUID } from "crypto"
import { sql } from "./db.js"

export class DatabasePostgres {
        #videos = new Map()

        async list(search = '') {
          let videos
          if(search) {
            video = await sql`select * from videos where title ilike "%${search}%"`
          } else {
            videos = await sql`select * from videos`
          }

          return videos
        }

        async create(video){
          const videoId = randomUUID()
          const {title, description, duration} = video

          await sql`inset into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
        }

        uptade(id, video){
          
        }


        delete(id){
           
        }
}