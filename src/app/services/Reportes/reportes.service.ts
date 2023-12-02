import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor() { }

  ReporteAsistencia(semanas:any){

    let reporteAsistencia:any
    console.log(semanas)
    let countEntreSemana=0;
    let countFinSemana=0;
    let sumaEntreSemana=0;
    let sumaFinSemana=0;
    semanas.forEach((asistencia:any) => {
      if(asistencia.entreSemana>0){
        countEntreSemana+=1;
        sumaEntreSemana+=asistencia.entreSemana;
      }
      if(asistencia.finSemana>0){
        countFinSemana+=1;
        sumaFinSemana+=asistencia.finSemana;
      }

       reporteAsistencia={
        cantidadReunionesEntreSemana:countEntreSemana,
        cantidadReunionesFinSemana:countFinSemana,
        sumaEntreSemana:sumaEntreSemana,
        sumaFinSemana:sumaFinSemana,
        promedioEntreSemana:sumaEntreSemana/countEntreSemana,
        promedioFinSemana:sumaFinSemana/countFinSemana
      }
    });
    //console.log(reporteAsistencia)
    return reporteAsistencia;
  }

  ReporteTotalesInformesPorGrupo(InformesPorGrupo:any){
    console.log(InformesPorGrupo)
    
    let Reporte:any
    let sumaHorasCong=0;
    let sumaPublicacionesCong=0;
    let sumaVideosCong=0;
    let sumaRevisitasCong=0;
    let sumaCursosCong=0;

    let sumaHorasPub=0;
    let sumaPublicacionesPub=0;
    let sumaVideosPub=0;
    let sumaRevisitasPub=0;
    let sumaCursosPub=0;

    let sumaHorasAux=0;
    let sumaPublicacionesAux=0;
    let sumaVideosAux=0;
    let sumaRevisitasAux=0;
    let sumaCursosAux=0;

    let sumaHorasReg=0;
    let sumaPublicacionesReg=0;
    let sumaVideosReg=0;
    let sumaRevisitasReg=0;
    let sumaCursosReg=0;

    let sumaHorasEsp=0;
    let sumaPublicacionesEsp=0;
    let sumaVideosEsp=0;
    let sumaRevisitasEsp=0;
    let sumaCursosEsp=0;
    
    let contadorCong=0;
    let contadorPub=0;
    let contadorAux=0;
    let contadorReg=0;
    let contadorEsp=0;
    InformesPorGrupo.forEach((grupo:any) => {
      
      let pubs=grupo["Publicadores"];
      
      pubs.forEach((publicador:any) => {
        
        if (publicador.grupo!=0){

          contadorCong+=1;
          //console.log(publicador.informe)

          sumaHorasCong+=publicador.informe.horas||0;
          sumaPublicacionesCong+=publicador.informe.publicaciones||0;
          sumaVideosCong+=publicador.informe.videos||0;
          sumaRevisitasCong+=publicador.informe.revisitas||0;
          sumaCursosCong+=publicador.informe.cursos||0;

          
          if(publicador.informe.servicio=="especial"){
            contadorEsp+=1;
            sumaHorasEsp+=publicador.informe.horas||0;
            sumaPublicacionesEsp+=publicador.informe.publicaciones||0;
            sumaVideosEsp+=publicador.informe.videos||0;
            sumaRevisitasEsp+=publicador.informe.revisitas||0;
            sumaCursosEsp+=publicador.informe.cursos||0;
          }
          else if(publicador.informe.servicio=="regular"){
            contadorReg+=1;
            sumaHorasReg+=publicador.informe.horas||0;
            sumaPublicacionesReg+=publicador.informe.publicaciones||0;
            sumaVideosReg+=publicador.informe.videos||0;
            sumaRevisitasReg+=publicador.informe.revisitas||0;
            sumaCursosReg+=publicador.informe.cursos||0;
          }
          else if(publicador.informe.servicio=="auxiliar"){
            contadorAux+=1;
            sumaHorasAux+=publicador.informe.horas||0;
            sumaPublicacionesAux+=publicador.informe.publicaciones||0;
            sumaVideosAux+=publicador.informe.videos||0;
            sumaRevisitasAux+=publicador.informe.revisitas||0;
            sumaCursosAux+=publicador.informe.cursos||0;
          }
          else{
            contadorPub+=1;
            sumaHorasPub+=publicador.informe.horas||0;
            sumaPublicacionesPub+=publicador.informe.publicaciones||0;
            sumaVideosPub+=publicador.informe.videos||0;
            sumaRevisitasPub+=publicador.informe.revisitas||0;
            sumaCursosPub+=publicador.informe.cursos||0;
          }
        }
        

        Reporte ={
          
          Congregacion:{
            cantidad:contadorCong,

            sumaHoras:sumaHorasCong,
            sumaPublicaciones:sumaPublicacionesCong,
            sumaVideos:sumaVideosCong,
            sumaRevisitas:sumaRevisitasCong,
            sumaCursos:sumaCursosCong,

            promedioHoras:sumaHorasCong/contadorCong ||0,
            promedioPublicaciones:sumaPublicacionesCong/contadorCong||0,
            promedioVideos:sumaVideosCong/contadorCong||0,
            promedioRevisitas:sumaRevisitasCong/contadorCong||0,
            promedioCursos:sumaCursosCong/contadorCong||0
          },
          Publicadores:{
            cantidad:contadorPub,

            sumaHoras:sumaHorasPub,
            sumaPublicaciones:sumaPublicacionesPub,
            sumaVideos:sumaVideosPub,
            sumaRevisitas:sumaRevisitasPub,
            sumaCursos:sumaCursosPub,

            promedioHoras:sumaHorasPub/contadorPub||0,
            promedioPublicaciones:sumaPublicacionesPub/contadorPub||0,
            promedioVideos:sumaVideosPub/contadorPub||0,
            promedioRevisitas:sumaRevisitasPub/contadorPub||0,
            promedioCursos:sumaCursosPub/contadorPub||0
          },
          Auxiliares:{
            cantidad:contadorAux,

            sumaHoras:sumaHorasAux,
            sumaPublicaciones:sumaPublicacionesAux,
            sumaVideos:sumaVideosAux,
            sumaRevisitas:sumaRevisitasAux,
            sumaCursos:sumaCursosAux,

            promedioHoras:sumaHorasAux/contadorAux||0,
            promedioPublicaciones:sumaPublicacionesAux/contadorAux||0,
            promedioVideos:sumaVideosAux/contadorAux||0,
            promedioRevisitas:sumaRevisitasAux/contadorAux||0,
            promedioCursos:sumaCursosAux/contadorAux||0
          },
          Regulares:{
            cantidad:contadorReg,

            sumaHoras:sumaHorasReg,
            sumaPublicaciones:sumaPublicacionesReg,
            sumaVideos:sumaVideosReg,
            sumaRevisitas:sumaRevisitasReg,
            sumaCursos:sumaCursosReg,
            
            promedioHoras:sumaHorasReg/contadorReg||0,
            promedioPublicaciones:sumaPublicacionesReg/contadorReg||0,
            promedioVideos:sumaVideosReg/contadorReg||0,
            promedioRevisitas:sumaRevisitasReg/contadorReg||0,
            promedioCursos:sumaCursosReg/contadorReg||0
          },
          Especiales:{
            cantidad:contadorEsp,

            sumaHoras:sumaHorasEsp,
            sumaPublicaciones:sumaPublicacionesEsp,
            sumaVideos:sumaVideosEsp,
            sumaRevisitas:sumaRevisitasEsp,
            sumaCursos:sumaCursosEsp,

            promedioHoras:sumaHorasEsp/contadorEsp||0,
            promedioPublicaciones:sumaPublicacionesEsp/contadorEsp||0,
            promedioVideos:sumaVideosEsp/contadorEsp||0,
            promedioRevisitas:sumaRevisitasEsp/contadorEsp||0,
            promedioCursos:sumaCursosEsp/contadorEsp||0
          }
        }

      });
    });

      //console.log(Reporte)
        return Reporte;
  
  }

  ReporteTotalesInformes(informes:any){
    let Reporte:any
    let sumaHorasCong=0;
    let sumaPublicacionesCong=0;
    let sumaVideosCong=0;
    let sumaRevisitasCong=0;
    let sumaCursosCong=0;

    let sumaHorasPub=0;
    let sumaPublicacionesPub=0;
    let sumaVideosPub=0;
    let sumaRevisitasPub=0;
    let sumaCursosPub=0;

    let sumaHorasAux=0;
    let sumaPublicacionesAux=0;
    let sumaVideosAux=0;
    let sumaRevisitasAux=0;
    let sumaCursosAux=0;

    let sumaHorasReg=0;
    let sumaPublicacionesReg=0;
    let sumaVideosReg=0;
    let sumaRevisitasReg=0;
    let sumaCursosReg=0;

    let sumaHorasEsp=0;
    let sumaPublicacionesEsp=0;
    let sumaVideosEsp=0;
    let sumaRevisitasEsp=0;
    let sumaCursosEsp=0;
    
    let contadorCong=0;
    let contadorPub=0;
    let contadorAux=0;
    let contadorReg=0;
    let contadorEsp=0;


    informes.forEach((informe:any) => {
      if(informe.grupo!=0){

        contadorCong+=1;
      sumaHorasCong+=informe['horas']||0;
      sumaPublicacionesCong+=informe['publicaciones']||0;
      sumaVideosCong+=informe['videos']||0;
      sumaRevisitasCong+=informe['revisitas']||0;
      sumaCursosCong+=informe['cursos']||0;

      
      if(informe['servicio']=="especial"){
        contadorEsp+=1;
        sumaHorasEsp+=informe['horas']||0;
        sumaPublicacionesEsp+=informe['publicaciones']||0;
        sumaVideosEsp+=informe['videos']||0;
        sumaRevisitasEsp+=informe['revisitas']||0;
        sumaCursosEsp+=informe['cursos']||0;
      }
      else if(informe['servicio']=="regular"){
        contadorReg+=1;
        sumaHorasReg+=informe['horas']||0;
        sumaPublicacionesReg+=informe['publicaciones']||0;
        sumaVideosReg+=informe['videos']||0;
        sumaRevisitasReg+=informe['revisitas']||0;
        sumaCursosReg+=informe['cursos']||0;
      }
      else if(informe['servicio']=="auxiliar"){
        contadorAux+=1;
        sumaHorasAux+=informe['horas']||0;
        sumaPublicacionesAux+=informe['publicaciones']||0;
        sumaVideosAux+=informe['videos']||0;
        sumaRevisitasAux+=informe['revisitas']||0;
        sumaCursosAux+=informe['cursos']||0;
      }
      else{
        contadorPub+=1;
        sumaHorasPub+=informe['horas']||0;
        sumaPublicacionesPub+=informe['publicaciones']||0;
        sumaVideosPub+=informe['videos']||0;
        sumaRevisitasPub+=informe['revisitas']||0;
        sumaCursosPub+=informe['cursos']||0;
      }
      }
      
      
    });

    Reporte ={
          
      Congregacion:{
        cantidad:contadorCong,

        sumaHoras:sumaHorasCong,
        sumaPublicaciones:sumaPublicacionesCong,
        sumaVideos:sumaVideosCong,
        sumaRevisitas:sumaRevisitasCong,
        sumaCursos:sumaCursosCong,

        promedioHoras:sumaHorasCong/contadorCong ||0,
        promedioPublicaciones:sumaPublicacionesCong/contadorCong||0,
        promedioVideos:sumaVideosCong/contadorCong||0,
        promedioRevisitas:sumaRevisitasCong/contadorCong||0,
        promedioCursos:sumaCursosCong/contadorCong||0
      },
      Publicadores:{
        cantidad:contadorPub,

        sumaHoras:sumaHorasPub,
        sumaPublicaciones:sumaPublicacionesPub,
        sumaVideos:sumaVideosPub,
        sumaRevisitas:sumaRevisitasPub,
        sumaCursos:sumaCursosPub,

        promedioHoras:sumaHorasPub/contadorPub||0,
        promedioPublicaciones:sumaPublicacionesPub/contadorPub||0,
        promedioVideos:sumaVideosPub/contadorPub||0,
        promedioRevisitas:sumaRevisitasPub/contadorPub||0,
        promedioCursos:sumaCursosPub/contadorPub||0
      },
      Auxiliares:{
        cantidad:contadorAux,

        sumaHoras:sumaHorasAux,
        sumaPublicaciones:sumaPublicacionesAux,
        sumaVideos:sumaVideosAux,
        sumaRevisitas:sumaRevisitasAux,
        sumaCursos:sumaCursosAux,

        promedioHoras:sumaHorasAux/contadorAux||0,
        promedioPublicaciones:sumaPublicacionesAux/contadorAux||0,
        promedioVideos:sumaVideosAux/contadorAux||0,
        promedioRevisitas:sumaRevisitasAux/contadorAux||0,
        promedioCursos:sumaCursosAux/contadorAux||0
      },
      Regulares:{
        cantidad:contadorReg,

        sumaHoras:sumaHorasReg,
        sumaPublicaciones:sumaPublicacionesReg,
        sumaVideos:sumaVideosReg,
        sumaRevisitas:sumaRevisitasReg,
        sumaCursos:sumaCursosReg,
        
        promedioHoras:sumaHorasReg/contadorReg||0,
        promedioPublicaciones:sumaPublicacionesReg/contadorReg||0,
        promedioVideos:sumaVideosReg/contadorReg||0,
        promedioRevisitas:sumaRevisitasReg/contadorReg||0,
        promedioCursos:sumaCursosReg/contadorReg||0
      },
      Especiales:{
        cantidad:contadorEsp,

        sumaHoras:sumaHorasEsp,
        sumaPublicaciones:sumaPublicacionesEsp,
        sumaVideos:sumaVideosEsp,
        sumaRevisitas:sumaRevisitasEsp,
        sumaCursos:sumaCursosEsp,

        promedioHoras:sumaHorasEsp/contadorEsp||0,
        promedioPublicaciones:sumaPublicacionesEsp/contadorEsp||0,
        promedioVideos:sumaVideosEsp/contadorEsp||0,
        promedioRevisitas:sumaRevisitasEsp/contadorEsp||0,
        promedioCursos:sumaCursosEsp/contadorEsp||0
      }
    }
    return Reporte;
  }


  // ReporteInformesPublicadores(InformesPublicadores:any){
    
    
  //   let Reporte:any
  //   let sumaHorasCong=0;
  //   let sumaPublicacionesCong=0;
  //   let sumaVideosCong=0;
  //   let sumaRevisitasCong=0;
  //   let sumaCursosCong=0;

  //   let sumaHorasPub=0;
  //   let sumaPublicacionesPub=0;
  //   let sumaVideosPub=0;
  //   let sumaRevisitasPub=0;
  //   let sumaCursosPub=0;

  //   let sumaHorasAux=0;
  //   let sumaPublicacionesAux=0;
  //   let sumaVideosAux=0;
  //   let sumaRevisitasAux=0;
  //   let sumaCursosAux=0;

  //   let sumaHorasReg=0;
  //   let sumaPublicacionesReg=0;
  //   let sumaVideosReg=0;
  //   let sumaRevisitasReg=0;
  //   let sumaCursosReg=0;

  //   let sumaHorasEsp=0;
  //   let sumaPublicacionesEsp=0;
  //   let sumaVideosEsp=0;
  //   let sumaRevisitasEsp=0;
  //   let sumaCursosEsp=0;
    
  //   let contadorCong=0;
  //   let contadorPub=0;
  //   let contadorAux=0;
  //   let contadorReg=0;
  //   let contadorEsp=0;
  //   InformesPorGrupo.forEach((grupo:any) => {
      
  //     let pubs=grupo["Publicadores"];
      
  //     pubs.forEach((publicador:any) => {
  //       contadorCong+=1;
  //       //console.log(publicador.informe)

  //       sumaHorasCong+=publicador.informe.horas||0;
  //       sumaPublicacionesCong+=publicador.informe.publicaciones||0;
  //       sumaVideosCong+=publicador.informe.videos||0;
  //       sumaRevisitasCong+=publicador.informe.revisitas||0;
  //       sumaCursosCong+=publicador.informe.cursos||0;

        
  //       if(publicador.informe.servicio=="especial"){
  //         contadorEsp+=1;
  //         sumaHorasEsp+=publicador.informe.horas||0;
  //         sumaPublicacionesEsp+=publicador.informe.publicaciones||0;
  //         sumaVideosEsp+=publicador.informe.videos||0;
  //         sumaRevisitasEsp+=publicador.informe.revisitas||0;
  //         sumaCursosEsp+=publicador.informe.cursos||0;
  //       }
  //       else if(publicador.informe.servicio=="regular"){
  //         contadorReg+=1;
  //         sumaHorasReg+=publicador.informe.horas||0;
  //         sumaPublicacionesReg+=publicador.informe.publicaciones||0;
  //         sumaVideosReg+=publicador.informe.videos||0;
  //         sumaRevisitasReg+=publicador.informe.revisitas||0;
  //         sumaCursosReg+=publicador.informe.cursos||0;
  //       }
  //       else if(publicador.informe.servicio=="auxiliar"){
  //         contadorAux+=1;
  //         sumaHorasAux+=publicador.informe.horas||0;
  //         sumaPublicacionesAux+=publicador.informe.publicaciones||0;
  //         sumaVideosAux+=publicador.informe.videos||0;
  //         sumaRevisitasAux+=publicador.informe.revisitas||0;
  //         sumaCursosAux+=publicador.informe.cursos||0;
  //       }
  //       else{
  //         contadorPub+=1;
  //         sumaHorasPub+=publicador.informe.horas||0;
  //         sumaPublicacionesPub+=publicador.informe.publicaciones||0;
  //         sumaVideosPub+=publicador.informe.videos||0;
  //         sumaRevisitasPub+=publicador.informe.revisitas||0;
  //         sumaCursosPub+=publicador.informe.cursos||0;
  //       }

  //       Reporte ={
          
  //         Congregacion:{
  //           cantidad:contadorCong,

  //           sumaHoras:sumaHorasCong,
  //           sumaPublicaciones:sumaPublicacionesCong,
  //           sumaVideos:sumaVideosCong,
  //           sumaRevisitas:sumaRevisitasCong,
  //           sumaCursos:sumaCursosCong,

  //           promedioHoras:sumaHorasCong/contadorCong ||0,
  //           promedioPublicaciones:sumaPublicacionesCong/contadorCong||0,
  //           promedioVideos:sumaVideosCong/contadorCong||0,
  //           promedioRevisitas:sumaRevisitasCong/contadorCong||0,
  //           promedioCursos:sumaCursosCong/contadorCong||0
  //         },
  //         Publicadores:{
  //           cantidad:contadorPub,

  //           sumaHoras:sumaHorasPub,
  //           sumaPublicaciones:sumaPublicacionesPub,
  //           sumaVideos:sumaVideosPub,
  //           sumaRevisitas:sumaRevisitasPub,
  //           sumaCursos:sumaCursosPub,

  //           promedioHoras:sumaHorasPub/contadorPub||0,
  //           promedioPublicaciones:sumaPublicacionesPub/contadorPub||0,
  //           promedioVideos:sumaVideosPub/contadorPub||0,
  //           promedioRevisitas:sumaRevisitasPub/contadorPub||0,
  //           promedioCursos:sumaCursosPub/contadorPub||0
  //         },
  //         Auxiliares:{
  //           cantidad:contadorAux,

  //           sumaHoras:sumaHorasAux,
  //           sumaPublicaciones:sumaPublicacionesAux,
  //           sumaVideos:sumaVideosAux,
  //           sumaRevisitas:sumaRevisitasAux,
  //           sumaCursos:sumaCursosAux,

  //           promedioHoras:sumaHorasAux/contadorAux||0,
  //           promedioPublicaciones:sumaPublicacionesAux/contadorAux||0,
  //           promedioVideos:sumaVideosAux/contadorAux||0,
  //           promedioRevisitas:sumaRevisitasAux/contadorAux||0,
  //           promedioCursos:sumaCursosAux/contadorAux||0
  //         },
  //         Regulares:{
  //           cantidad:contadorReg,

  //           sumaHoras:sumaHorasReg,
  //           sumaPublicaciones:sumaPublicacionesReg,
  //           sumaVideos:sumaVideosReg,
  //           sumaRevisitas:sumaRevisitasReg,
  //           sumaCursos:sumaCursosReg,
            
  //           promedioHoras:sumaHorasReg/contadorReg||0,
  //           promedioPublicaciones:sumaPublicacionesReg/contadorReg||0,
  //           promedioVideos:sumaVideosReg/contadorReg||0,
  //           promedioRevisitas:sumaRevisitasReg/contadorReg||0,
  //           promedioCursos:sumaCursosReg/contadorReg||0
  //         },
  //         Especiales:{
  //           cantidad:contadorEsp,

  //           sumaHoras:sumaHorasEsp,
  //           sumaPublicaciones:sumaPublicacionesEsp,
  //           sumaVideos:sumaVideosEsp,
  //           sumaRevisitas:sumaRevisitasEsp,
  //           sumaCursos:sumaCursosEsp,

  //           promedioHoras:sumaHorasEsp/contadorEsp||0,
  //           promedioPublicaciones:sumaPublicacionesEsp/contadorEsp||0,
  //           promedioVideos:sumaVideosEsp/contadorEsp||0,
  //           promedioRevisitas:sumaRevisitasEsp/contadorEsp||0,
  //           promedioCursos:sumaCursosEsp/contadorEsp||0
  //         }
  //       }

  //     });
  //   });

  //     //console.log(Reporte)
  //       return Reporte;
  
  // }


}
