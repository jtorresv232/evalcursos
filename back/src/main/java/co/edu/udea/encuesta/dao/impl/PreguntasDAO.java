/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.encuesta.dao.impl;

import co.edu.udea.encuesta.dao.ConnectionPool;
import co.edu.udea.encuesta.dto.BancoPreguntasEncuesta;
import co.edu.udea.encuesta.properties.Properties;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Collection;
import java.util.LinkedList;
import oracle.jdbc.OracleTypes;

/**
 *
 * @author Jonathan
 */
public class PreguntasDAO extends ConnectionPool{
    
    /*public Collection<BancoPreguntasEncuesta> getPreguntas(){
        CallableStatement ps = null;
        ResultSet rs = null;
        Collection<BancoPreguntasEncuesta> listaPreguntas = new LinkedList<>();
        BancoPreguntasEncuesta pregunta;
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("punto.obtener"));
            ps.setString(1, "MOIS_ANALISTAENCUESTAS");
            ps.registerOutParameter(2, OracleTypes.CURSOR);
            ps.executeQuery();
            rs = (ResultSet)ps.getObject(2);
            if(rs!=null){
                while(rs.next()){
                    pregunta = new BancoPreguntasEncuesta();
                    pregunta.setNumero(rs.getInt("NUMERO"));
                    pregunta.setTema(rs.getInt("TEMA"));
                    pregunta.setPregunta(rs.getString("PREGUNTA"));
                    pregunta.setOpcion_otro(rs.getString("OPCION_OTRO"));
                    pregunta.setTipo(rs.getString("TIPO"));
                    pregunta.setOpcion_unica(rs.getString("OPCION_UNICA"));
                    pregunta.setTipodato(rs.getString("TIPODATO"));                    
                    listaPreguntas.add(pregunta);
                }
            }
        }catch(Exception e){
            System.out.println(e);
        }finally{
        close(ps,rs);
        }
        
        return listaPreguntas;
    }*/
    
    public Collection<BancoPreguntasEncuesta> getPreguntas(){
        CallableStatement ps = null;
        ResultSet rs = null;
        Collection<BancoPreguntasEncuesta> listaPreguntas = new LinkedList<>();
        BancoPreguntasEncuesta pregunta;
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("preguntas.obtenerXrol"));
            ps.setString(1, "MOIS_ANALISTAENCUESTAS");
            ps.registerOutParameter(2, OracleTypes.CURSOR);
            ps.executeQuery();
            rs = (ResultSet)ps.getObject(2);
            if(rs!=null){
                while(rs.next()){
                    pregunta = new BancoPreguntasEncuesta();
                    pregunta.setNumero(rs.getInt("NUMERO"));
                    pregunta.setTema(rs.getInt("TEMA"));
                    pregunta.setPregunta(rs.getString("PREGUNTA"));
                    pregunta.setOpcion_otro(rs.getString("OPCION_OTRO"));
                    pregunta.setTipo(rs.getString("TIPO"));
                    pregunta.setOpcion_unica(rs.getString("OPCION_UNICA"));
                    pregunta.setTipodato(rs.getString("TIPODATO"));
                    pregunta.setTemaDesc(rs.getString("DESCRIPCION"));
                    listaPreguntas.add(pregunta);
                }
            }
        }catch(Exception e){
            System.out.println(e);
        }finally{
        close(ps,rs);
        }
        
        return listaPreguntas;
    }
    
    public BancoPreguntasEncuesta addPregunta(BancoPreguntasEncuesta pregunta){
        CallableStatement ps = null;
        ResultSet rs = null;
        BancoPreguntasEncuesta miPregunta = new BancoPreguntasEncuesta();
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("preguntas.agregar"));
            ps.setString(1, pregunta.getPregunta());
            ps.setString(2, pregunta.getTipo());
            ps.setString(3, pregunta.getOpcion_otro());
            ps.setInt(4, pregunta.getTema());
            ps.setString(5, pregunta.getOpcion_unica());
            ps.setString(6, pregunta.getTipodato());
            ps.registerOutParameter(7, OracleTypes.CURSOR);
            ps.executeQuery();
            rs = (ResultSet)ps.getObject(7);
            if(rs!=null){
                rs.next();
                    miPregunta.setNumero(rs.getInt("NUMERO"));
                    miPregunta.setTema(rs.getInt("TEMA"));
                    miPregunta.setPregunta(rs.getString("PREGUNTA"));
                    miPregunta.setOpcion_otro(rs.getString("OPCION_OTRO"));
                    miPregunta.setTipo(rs.getString("TIPO"));
                    miPregunta.setOpcion_unica(rs.getString("OPCION_UNICA"));
                    miPregunta.setTipodato(rs.getString("TIPODATO"));
                    miPregunta.setTemaDesc(rs.getString("DESCRIPCION"));
                
            }
        }catch(Exception e){
            System.out.println(e);
        }finally{
            close(ps,rs);
        }
        
        return miPregunta;
    }
    
    public boolean updatePregunta(BancoPreguntasEncuesta pregunta){
        PreparedStatement ps = null;
        ResultSet rs = null;
        boolean actualizado = false;
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("preguntas.actualizar"));
            ps.setInt(1, pregunta.getNumero());
            ps.setString(2, pregunta.getPregunta());
            ps.setString(3, pregunta.getTipo());
            ps.setString(4, pregunta.getOpcion_otro());
            ps.setInt(5, pregunta.getTema());
            ps.setString(6, pregunta.getOpcion_unica());
            ps.setString(7, pregunta.getTipo());
            
            actualizado = ps.executeUpdate() > 0;
            
        }catch(Exception e){
            System.out.println(e);
        }finally{
        close(ps,rs);
    }
        
        return actualizado;
    }
}
