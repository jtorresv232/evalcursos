/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.encuesta.dto;

import java.io.Serializable;

/**
 *
 * @author Jonathan
 */
public class PreguntaPorEncuesta implements Serializable{
    private int punto;
    private String identificacion;
    private int numero;
    private int orden;
    private String obligatoriedad;
    private String pregunta;
    private String textoSeccion;
    private String opcionUnica;
    private String tipodato;

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public String getTextoSeccion() {
        return textoSeccion;
    }

    public void setTextoSeccion(String textoSeccion) {
        this.textoSeccion = textoSeccion;
    }

    public String getOpcionUnica() {
        return opcionUnica;
    }

    public void setOpcionUnica(String opcionUnica) {
        this.opcionUnica = opcionUnica;
    }

    public String getTipodato() {
        return tipodato;
    }

    public void setTipodato(String tipodato) {
        this.tipodato = tipodato;
    }

    public PreguntaPorEncuesta() {
    }

    public int getPunto() {
        return punto;
    }

    public void setPunto(int punto) {
        this.punto = punto;
    }

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public int getOrden() {
        return orden;
    }

    public void setOrden(int orden) {
        this.orden = orden;
    }

    public String getObligatoriedad() {
        return obligatoriedad;
    }

    public void setObligatoriedad(String obligatoriedad) {
        this.obligatoriedad = obligatoriedad;
    }
    
    
}
