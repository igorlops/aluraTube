import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";



function useForm(propsDoForm){
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values, 
        handleChange: (e)=>{
            const value = e.target.value;
            const name = e.target.name
            setValues({
                ...values,
                [name]:value,
            });
        },
        clearForm(){
            setValues({});
        },
        // const thumb = (${value.url + "/hqdefault/.jpg"});
    };
}

const PROJECT_URL = "https://dmuhomfycmjymwsmvjqs.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtdWhvbWZ5Y21qeW13c212anFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTgzNTQsImV4cCI6MTk4NDAzNDM1NH0.BxDvy9NFrwYwPq6eiTE6dsswfaMc8OvcNxmTtZLmc-0"
const supabase = createClient(PROJECT_URL,PUBLIC_KEY);

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo(){
    const formCadastro = useForm({
        initialValues: {titulo:"", url:""}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);
    
    return(
    <StyledRegisterVideo>

        <button className="add-video" onClick={()=>setFormVisivel(true)}>
            +
        </button>
        {formVisivel ?
        (<form onSubmit={(e)=>{
            e.preventDefault();
            setFormVisivel(false);
            formCadastro.clearForm();
            supabase.from("video").insert({
                title:formCadastro.values.titulo,
                url:formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist:"jogos",
            })
            .then((oqueveio)=> {
                console.log(oqueveio);
            })
            .catch((err)=> {
                console.log(err);
            })
        }}>
            <div>
                <button type="button" className="close-modal" onClick={()=>setFormVisivel(false)}>
                    X
                </button>
                <input 
                placeholder="Titulo do video" 
                name="titulo"
                value={formCadastro.values.titulo} 
                onChange={formCadastro.handleChange}/>
                
                <input placeholder="URL" 
                value={formCadastro.values.url}
                name="url"
                onChange={formCadastro.handleChange}/>
                <button type="submit">
                    Cadastrar
                </button>

            </div>
        </form>)
        : false}
    </StyledRegisterVideo>
)
}

