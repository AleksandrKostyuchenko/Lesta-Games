import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

export type VehiclesType = {
  title: string | null
  description: string | null
  icons: IconType
  level: number
  type: TypesType
  nation: NationType
}
type IconType = {
  large: string
  medium:string
}

type IconsType = {
  large: string
  medium: string | null
  small: string | null
}

type TypesType = {
  name: string
  title: string
  icons: IconsDefaultType
}

type IconsDefaultType = {
  default: string
}

type NationType = {
  name: string
  title: string
  color: string
  icons: IconsType

}

function App() {
  let [tags, setTags] = useState<Array<VehiclesType>>([])
  console.log(tags)
  useEffect(() => {
    console.log('useEfect')
    let data = JSON.stringify({
      query: `{
  vehicles {
    title
    description
    icons {
      large
      medium
    }
    level
    type {
      name
    	title
      icons {
        default
      }
    }
    nation {
      name
      title
      color
      icons {
        small
        medium
        large
      }
    }
  }
}`,
      variables: {}
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://vortex.korabli.su/api/graphql/glossary',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
        .then((response) => {
          setTags(response.data.data.vehicles);
        })
        .catch((error) => {
          console.log(error);
        });

  }, []);

  return (
      <div>

        {tags.map((t, index) => {

          return (
              <div key={index}>
                <h3>{t.type.name} : {t.nation.name}</h3>
                <p>{t.level}</p>
                <img src={t.icons.large} alt=""/>
              </div>
          )
        })}
      </div>
  )
}

export default App
