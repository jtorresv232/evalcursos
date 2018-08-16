/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.encuesta.dao.impl;

import co.edu.udea.encuesta.dao.ConnectionPool;
import co.edu.udea.encuesta.dto.Seccion;
import co.edu.udea.encuesta.properties.Properties;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Collection;
import java.util.LinkedList;
import oracle.jdbc.OracleTypes;

/**
 *
 * @author nilto
 */
public class SeccionDAO extends ConnectionPool{
    
    public Collection<Seccion> getSecciones(){
        CallableStatement ps = null;
        ResultSet rs = null;
        Collection<Seccion> listaSecciones = new LinkedList<>();
        Seccion seccion;
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("seccion.obtener"));
            rs = ps.executeQuery();
            if(rs!=null){
                while(rs.next()){
                    seccion = new Seccion();
                    seccion.setSeccion(rs.getString("SECCION"));
                    seccion.setTexto(rs.getString("TEXTO"));
                    seccion.setPunto(rs.getInt("PUNTO"));
                    seccion.setIdentificacion(rs.getString("IDENTIFICACION"));
                    seccion.setPreguntaDondeArranca(rs.getInt("PREGUNTADONDEARRANCA"));
                    listaSecciones.add(seccion);
                }
            }
        }catch(Exception e){
            System.out.println(e);
        }finally{
            close(ps,rs);
        }
        return listaSecciones;
    }
    
    public Seccion addSeccion(Seccion seccion){
        CallableStatement ps = null;
        ResultSet rs = null;
        Seccion secc = new Seccion();
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("seccion.agregar"));
            ps.setString(1, seccion.getTexto());
            ps.setInt(2, seccion.getPunto());
            ps.setString(3, seccion.getIdentificacion());
            ps.setInt(4, seccion.getPreguntaDondeArranca());
            ps.registerOutParameter(5, OracleTypes.CURSOR);
            ps.executeQuery();
            rs=(ResultSet)ps.getObject(5);
            if(rs!=null){
                secc.setSeccion(rs.getString("SECCION"));
                secc.setTexto(rs.getString("TEXTO"));
                secc.setPunto(rs.getInt("PUNTO"));
                secc.setIdentificacion(rs.getString("IDENTIFICACION"));
                secc.setPreguntaDondeArranca(rs.getInt("PREGUNTADONDEARRANCA"));
            }
        }catch(Exception e){
            System.out.println(e);
        }finally{
            close(ps,rs);
        }
        return secc;
    }
    
    public boolean updateSeccion(Seccion seccion){
        PreparedStatement ps = null;
        ResultSet rs = null;
        boolean actualizado = false;
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("seccion.agregar"));
            ps.setString(1, seccion.getSeccion());
            ps.setString(2, seccion.getTexto());
            ps.setInt(3, seccion.getPunto());
            ps.setString(4, seccion.getIdentificacion());
            ps.setInt(5, seccion.getPreguntaDondeArranca());
            actualizado = ps.executeUpdate() > 0;
        }catch(Exception e){
            System.out.println(e);
        }finally{
            close(ps,rs);
        }
        return actualizado;
    }
    
}