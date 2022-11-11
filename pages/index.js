import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";



function HomePage() {  
  // const estilosDaHomePage = {

  // };

  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  return (
    <>
    
     <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header/>
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
          Conteúdo
        </Timeline>
      </div>
    </>
    );
  }
  
  export default HomePage

  // function Menu(){
  //   return(
  //     <div>Menu</div>
  //   );
  // }



  const StyledHeader = styled.div`
    .banner{
      position: relative;
      width: 100%;
      height: 300px;
      top:56px; 
      z-index: -1;

    }
    .banner img{
      padding: 1px;
      width: 1920px;
      height:300px;
      
}

    section.user-info > img{
      width: 80px;
      height:80px;
      border-radius:50%;
    }

    .user-info{
      margin:50px;
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 32px;
      gap: 2em;
    }
  `;
  function Header(){
    return(
      <StyledHeader>
        <div className="banner">
          <img src={`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80`}/>
        </div>
        <section className="user-info">
          <img src={`https://github.com/${config.github}.png`}/>
          <div>
            <h2>{config.name}</h2>
            <p>{config.job}</p>
          </div>
        </section>
      </StyledHeader>
    )
  }

  function Timeline({searchValue,...props}){ // poderiamos chamr qualquer outro nome, tipo propriedades, usamos props por convensão
    // console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists);

    return(
      <StyledTimeline>
        {playlistNames.map((playlistName) => {
          const videos = props.playlists[playlistName];
          
          // console.log(playlistName);
          // console.log(videos);


          return (
            <section key={playlistName}>
              <h2>{playlistName}</h2>
              <div>
                 {videos
                 .filter((video) => {
                    const titleNormalized = toString(video.title).toLowerCase();
                    const searchValueNormalized = toString(searchValue).toLowerCase();
                    return titleNormalized.includes(searchValueNormalized)
                 })
                 .map((video) => {
                    return (
                      <a key={video.url} href={video.url}>
                        <img src={video.thumb}/>
                        <span>
                          {video.title}
                        </span>
                      </a>
                    )
    
            })}
        </div>
      

            </section>
          )
           })}

           
      </StyledTimeline>
    );
  }
  