/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.encuesta.dao.impl;

import co.edu.udea.encuesta.dao.ConnectionPool;
import co.edu.udea.encuesta.dto.PreguntaPorEncuesta;
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
public class PreguntaPorEncuestaDAO extends ConnectionPool{
    
    public Collection<PreguntaPorEncuesta> getPreguntas(String identificacion){
        CallableStatement ps = null;
        ResultSet rs = null;
        Collection<PreguntaPorEncuesta> listaPreguntas = new LinkedList<>();        
        PreguntaPorEncuesta pregunta;
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("preguntaXEncuesta.obtener"));
            ps.setString(1, identificacion);
            ps.registerOutParameter(2, OracleTypes.CURSOR);
            ps.executeQuery();
            rs = (ResultSet) ps.getObject(2);
            if(rs!=null){
                while(rs.next()){
                    pregunta = new PreguntaPorEncuesta();
                    pregunta.setNumero(rs.getInt("NUMERO"));
                    pregunta.setOrden(rs.getInt("ORDEN"));
                    pregunta.setObligatoriedad(rs.getString("OBLIGATORIEDAD"));
                    pregunta.setPregunta(rs.getString("PREGUNTA"));
                    pregunta.setTextoSeccion(rs.getString("TEXTO"));
                    pregunta.setOpcionUnica(rs.getString("OPCION_UNICA"));
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
    }
    
    public PreguntaPorEncuesta addPregunta(PreguntaPorEncuesta pregunta){
        CallableStatement ps = null;
        ResultSet rs = null;
       PreguntaPorEncuesta preg = new PreguntaPorEncuesta();
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("preguntaXEncuesta.agregar"));
            ps.setInt(1, pregunta.getPunto());
            ps.setString(2, pregunta.getIdentificacion());
            ps.setInt(3, pregunta.getNumero());
            ps.setInt(4,pregunta.getOrden());
            ps.setString(5, pregunta.getObligatoriedad());
            ps.registerOutParameter(6, OracleTypes.CURSOR);
            ps.executeQuery();
            rs=(ResultSet)ps.getObject(6);
            if(rs!=null)
            {
                rs.next();
                preg.setPunto(rs.getInt("PUNTO"));
                preg.setIdentificacion(rs.getString("IDENTIFICACION"));
                preg.setNumero(rs.getInt("NUMERO"));
                preg.setOrden(rs.getInt("ORDEN"));
                preg.setObligatoriedad(rs.getString("OBLIGATORIEDAD"));
            }
            
        }catch(Exception e){
            System.out.println(e);
        }finally{
            close(ps,rs);
        }
            return preg;
    }    
    
    public boolean updatePregunta(PreguntaPorEncuesta pregunta){
        PreparedStatement ps = null;
        ResultSet rs = null;
        boolean actualizado = false;
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("preguntaXEncuesta.actualizar"));
            ps.setInt(1, pregunta.getPunto());
            ps.setString(2, pregunta.getIdentificacion());
            ps.setInt(3, pregunta.getNumero());
            ps.setInt(4,pregunta.getOrden());
            ps.setString(5, pregunta.getObligatoriedad());
            
            actualizado = ps.executeUpdate() > 0;
        }catch(Exception e){
            System.out.println(e);
        }finally{
            close(ps,rs);
        }
            return actualizado;
    }
}
