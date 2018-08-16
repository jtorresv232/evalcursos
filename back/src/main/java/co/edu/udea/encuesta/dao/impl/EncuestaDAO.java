/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.encuesta.dao.impl;

import co.edu.udea.encuesta.dao.ConnectionPool;
import co.edu.udea.encuesta.dto.Encuestas;
import co.edu.udea.encuesta.properties.Properties;
import java.sql.CallableStatement;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Collection;
import java.util.LinkedList;
import oracle.jdbc.OracleTypes;

/**
 *
 * @author Jonathan
 */
public class EncuestaDAO extends ConnectionPool{
    
    public Collection<Encuestas> getEncuestas(){
        CallableStatement ps = null;
        ResultSet rs = null;
        Collection<Encuestas> listaEncuestas = new LinkedList<>();
        Encuestas encuesta;
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("encuesta.obtener_x_rol"));
            ps.setString(1, "MOIS_ANALISTAENCUESTAS");
            ps.registerOutParameter(2, OracleTypes.CURSOR);
            ps.executeQuery();
            rs = (ResultSet) ps.getObject(2);
            if(rs!=null){
                while(rs.next()){
                    encuesta = new Encuestas();
                    encuesta.setPunto(rs.getInt("PUNTO"));
                    encuesta.setIdentificacion(rs.getString("IDENTIFICACION"));
                    encuesta.setFechaInicio(rs.getDate("FECHAINICIO"));
                    encuesta.setFechaTerminacion(rs.getDate("FECHATERMINACION"));
                    encuesta.setModificable(rs.getString("MODIFICABLE"));
                    encuesta.setSql_personasAplica(rs.getString("SQL_PERSONASAPLICA"));
                    encuesta.setNombreEncuesta(rs.getString("NOMBREENCUESTA"));
                    encuesta.setEncabezado(rs.getString("ENCABEZADO"));
                    encuesta.setRequiereLogeo(rs.getString("REQUIERELOGEO"));
                    encuesta.setSecreta(rs.getString("SECRETA"));
                    encuesta.setEstructuraMetadato(rs.getString("ESTRUCTURA_METADATO"));
                    
                    listaEncuestas.add(encuesta);
                    
                    
                }
            }
        }catch(Exception e){
            System.out.println(e);
        }finally{
            close(ps,rs);
        }
        return listaEncuestas;
    }
    
    public Encuestas addEncuest(Encuestas encuesta){
        CallableStatement ps = null;
        ResultSet rs = null;
        Encuestas miencuesta = new Encuestas();
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("encuesta.agregar"));
            ps.setInt(1, encuesta.getPunto());
            ps.setString(2, encuesta.getIdentificacion());
            ps.setDate(3, (Date) encuesta.getFechaInicio());
            ps.setDate(4, (Date) encuesta.getFechaTerminacion());
            ps.setString(5, encuesta.getModificable());
            ps.setString(6, encuesta.getSql_personasAplica());
            ps.setString(7, encuesta.getNombreEncuesta());
            ps.setString(8, encuesta.getEncabezado());
            ps.setString(9, encuesta.getRequiereLogeo());
            ps.setString(10, encuesta.getSecreta());;
            ps.setString(11, encuesta.getEstructuraMetadato());
            ps.registerOutParameter(12, OracleTypes.CURSOR);
            ps.executeQuery();
            rs = (ResultSet) ps.getObject(12);
            System.out.println(ps.getObject(12));
            if(rs!=null){
            rs.next();
            miencuesta.setPunto(rs.getInt("PUNTO"));
            miencuesta.setIdentificacion(rs.getString("IDENTIFICACION"));
            miencuesta.setModificable(rs.getString("MODIFICABLE"));
            miencuesta.setSql_personasAplica(rs.getString("SQL_PERSONASAPLICA"));
            miencuesta.setSecreta(rs.getString("SECRETA"));
            miencuesta.setNombreEncuesta(rs.getString("NOMBREENCUESTA"));
            miencuesta.setEncabezado(rs.getString("ENCABEZADO"));
            miencuesta.setRequiereLogeo(rs.getString("REQUIERELOGEO"));
            miencuesta.setEstructuraMetadato(rs.getString("ESTRUCTURA_METADATO"));
            miencuesta.setFechaInicio(rs.getDate("FECHAINICIO"));
            miencuesta.setFechaTerminacion(rs.getDate("FECHATERMINACION"));
            
            }
        }catch(Exception e){
            System.out.println(e);
        }finally{
            close(ps,rs);
        }
        
        return miencuesta;
    }
    
    public boolean updateEncuesta(Encuestas encuesta){
        PreparedStatement ps = null;
        ResultSet rs = null;
        boolean actualizado = false;
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("encuesta.actualizar"));
            ps.setInt(1, encuesta.getPunto());
            ps.setString(2, encuesta.getIdentificacion());
            ps.setDate(3, (Date) encuesta.getFechaInicio());
            ps.setDate(4, (Date) encuesta.getFechaTerminacion());
            ps.setString(5, encuesta.getModificable());
            ps.setString(6, encuesta.getSql_personasAplica());
            ps.setString(7, encuesta.getNombreEncuesta());
            ps.setString(8, encuesta.getEncabezado());
            ps.setString(9, encuesta.getRequiereLogeo());
            ps.setString(10, encuesta.getSecreta());;
            ps.setString(11, encuesta.getEstructuraMetadato());
            
            actualizado = ps.executeUpdate() > 0;
        }catch(Exception e){
            System.out.println(e);
        }finally{
            close(ps,rs);
        }
        
        return actualizado;
    }
}
