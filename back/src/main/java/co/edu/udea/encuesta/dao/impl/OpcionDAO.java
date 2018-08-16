/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.encuesta.dao.impl;

import co.edu.udea.encuesta.dao.ConnectionPool;
import co.edu.udea.encuesta.dto.Opcion;
import co.edu.udea.encuesta.properties.Properties;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Collection;
import java.util.LinkedList;
import oracle.jdbc.OracleTypes;
import oracle.jdbc.oracore.OracleType;

/**
 *
 * @author Jonathan
 */
public class OpcionDAO extends ConnectionPool{
    
    public Collection<Opcion> getOpciones(int pregunta){
        CallableStatement ps = null;
        ResultSet rs = null;
        Collection<Opcion> listaOpciones = new LinkedList<>();
        Opcion opcion;
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("opcion.obtener"));
            ps.setInt(1, pregunta);
            ps.registerOutParameter(2, OracleTypes.CURSOR);
            ps.executeQuery();
            rs = (ResultSet) ps.getObject(2);
            
            if(rs!=null){
                while(rs.next()){
                    opcion = new Opcion();
                    opcion.setNumero(rs.getInt("NUMERO"));
                    opcion.setOpcion(rs.getInt("OPCION"));
                    opcion.setTexto(rs.getString("TEXTO"));
                    opcion.setMixta(rs.getString("MIXTA"));
                    listaOpciones.add(opcion);
                }
            }
        }catch(Exception e){
            System.out.println(e);
        }finally{
            close(ps,rs);
        }
        return listaOpciones;
    }
    
    public Opcion addOpcion(Opcion opcion){
        CallableStatement ps = null;
        ResultSet rs = null;
        Opcion miOpcion = new Opcion();
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("opcion.agregar"));
            ps.setInt(1, opcion.getNumero());
            ps.setString(2, opcion.getMixta());
            ps.setString(3, opcion.getTexto());
            ps.registerOutParameter(4, OracleTypes.CURSOR);
            System.out.println(opcion.getNumero());
            
           ps.executeQuery();
           rs = (ResultSet)ps.getObject(4);
           if(rs!=null){
               rs.next();
               miOpcion.setNumero(rs.getInt("NUMERO"));
                miOpcion.setOpcion(rs.getInt("OPCION"));
                miOpcion.setTexto(rs.getString("TEXTO"));
                miOpcion.setMixta(rs.getString("MIXTA"));
               
           }
        }catch(Exception e){
            System.out.println(e);
        }finally{
            close(ps,rs);
        }
            return miOpcion;
    }
    
    public boolean updateOpcion(Opcion opcion){
        PreparedStatement ps = null;
        ResultSet rs = null;
        boolean actualizado = false;
        
        try{
            ps = getConn().prepareCall(Properties.getInstance().getEncuestasProperties().getString("opcion.actualizar"));
            ps.setInt(1, opcion.getNumero());
            ps.setInt(2, opcion.getOpcion());
            ps.setString(3, opcion.getTexto());
            ps.setString(4, opcion.getMixta());
            
            actualizado = ps.executeUpdate() > 0;
        }catch(Exception e){
            System.out.println(e);
        }finally{
            close(ps,rs);
        }
            return actualizado;
    }
    
}