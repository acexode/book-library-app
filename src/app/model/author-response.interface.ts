export interface AuthorResponse {
    source_records: string[]
    type: Type
    key: string
    photo: string
    name: string
    bio: string
    remote_ids: RemoteIds
    death_date: string
    personal_name: string
    birth_date: string
    alternate_names: string[]
    photos: number[]
    latest_revision: number
    revision: number
    created: Created
    last_modified: LastModified
  }
  
  export interface Type {
    key: string
  }
  
  export interface RemoteIds {
    isni: string
    viaf: string
    wikidata: string
  }
  
  export interface Created {
    type: string
    value: string
  }
  
  export interface LastModified {
    type: string
    value: string
  }
  