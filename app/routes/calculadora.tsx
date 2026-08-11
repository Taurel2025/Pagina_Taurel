import React, { useState, useEffect, useMemo } from 'react';
import '../styles/calculadora.css';

export default function CalculadoraEnvio() {
  const [form, setForm] = useState({
    cantidad: 1,
    tarifaBase: 0,
    gestionAdmin: 0,
    monitoreoVial: 0,
    tasaBcv: 0,
    porcentajeRetencionIva: 75,
    unidades: [] as any[]
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

  useEffect(() => {
    const consultarDatosIniciales = async () => {
      try {
        setLoading(true);

        // Consultamos en paralelo la API de tarifas de Taurel y la tasa oficial BCV de DolarAPI
        const [responseTarifas, responseDolar] = await Promise.all([
          fetch('https://logistics.taurel.com/api/tarifa'),
          fetch('https://ve.dolarapi.com/v1/dolares/oficial')
        ]);

        if (!responseTarifas.ok) {
          throw new Error(`Error en tarifas: ${responseTarifas.status}`);
        }

        const dataTarifas = await responseTarifas.json();
        const unidades = cleanJson(dataTarifas.datos);

        let tasaOficial = 0;
        if (responseDolar.ok) {
          const dataDolar = await responseDolar.json();
          tasaOficial = Number(dataDolar.promedio.toFixed(3)) || 0;
        }

        setForm((prev) => ({
          ...prev,
          tarifaBase: Number(dataTarifas.Monto) || 0,
          gestionAdmin: Number(dataTarifas.seguro) || 0,
          monitoreoVial: Number(dataTarifas.aduana) || 0,
          tasaBcv: tasaOficial > 0 ? tasaOficial : prev.tasaBcv,
          unidades: unidades
        }));
        setError(null);
      } catch (err) {
        console.error("Error cargando los datos iniciales:", err);
        setError("No se pudieron cargar los datos automáticos.");
      } finally {
        setLoading(false);
      }
    };

    consultarDatosIniciales();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value === '' ? '' : Number(value)
    }));
  };

  const subtotalContenedores = useMemo(() => {
    const cantidad = form.cantidad > 0 ? form.cantidad : 0;
    const tarifa = form.tarifaBase > 0 ? form.tarifaBase : 0;
    return cantidad * tarifa;
  }, [form.cantidad, form.tarifaBase]);

  const gestionAdminTotal = useMemo(() => {
    const cantidad = form.cantidad > 0 ? form.cantidad : 0;
    return cantidad * (form.gestionAdmin || 0);
  }, [form.cantidad, form.gestionAdmin]);

  const monitoreoVialTotal = useMemo(() => {
    const cantidad = form.cantidad > 0 ? form.cantidad : 0;
    return cantidad * (form.monitoreoVial || 0);
  }, [form.cantidad, form.monitoreoVial]);

  const subtotalGeneralUSD = useMemo(() => {
    return subtotalContenedores + gestionAdminTotal + monitoreoVialTotal;
  }, [subtotalContenedores, gestionAdminTotal, monitoreoVialTotal]);

  const vatUSD = useMemo(() => {
    return subtotalGeneralUSD * 0.16;
  }, [subtotalGeneralUSD]);

  const totalConVatUSD = useMemo(() => {
    return subtotalGeneralUSD + vatUSD;
  }, [subtotalGeneralUSD, vatUSD]);

  const retencionIslrUSD = useMemo(() => {
    return subtotalGeneralUSD * 0.02;
  }, [subtotalGeneralUSD]);

  const retencionIvaUSD = useMemo(() => {
    return vatUSD * (form.porcentajeRetencionIva / 100);
  }, [vatUSD, form.porcentajeRetencionIva]);

  const totalSinRetencionUSD = useMemo(() => {
    return totalConVatUSD;
  }, [totalConVatUSD]);

  const totalSinRetencionVES = useMemo(() => {
    return totalSinRetencionUSD * form.tasaBcv;
  }, [totalSinRetencionUSD, form.tasaBcv]);

  const totalConRetencionUSD = useMemo(() => {
    return totalSinRetencionUSD - retencionIslrUSD - retencionIvaUSD;
  }, [totalSinRetencionUSD, retencionIslrUSD, retencionIvaUSD]);

  const totalConRetencionVES = useMemo(() => {
    return totalConRetencionUSD * form.tasaBcv;
  }, [totalConRetencionUSD, form.tasaBcv]);

  const formatMonedaUSD = (valor: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(valor || 0);
  };

  const formatMonedaVES = (valor: number) => {
    return 'Bs. ' + new Intl.NumberFormat('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor || 0);
  };

  const cleanJson = (data: any): any[] => {
    const grouped = data.reduce((acc: any, item: any, index: number) => {
      const unidadId = item.UnidadNegocio.trim();
      if (!acc[unidadId]) {
        acc[unidadId] = {
          id: index,
          Cia: item.Cia,
          UnidadNegocio: unidadId,
          DescripcionUnidNegocio: item.DescripcionUnidNegocio,
          TarifaNaviera: item.TarifaNaviera,
          FechaATA: item.FechaATA,
          TipoFacturaNaviero: item.TipoFacturaNaviero,
          Conceptos: [],
          Total: 0
        };
      }
      acc[unidadId].Conceptos.push({
        Id: item.Concepto,
        Descripcion: item.DescripcionConcepto,
        Monto: item.Monto
      });
      acc[unidadId].Total += item.Monto;
      return acc;
    }, {});
    return Object.values(grouped);
  };

  const manejarCambio = (evento: any) => {
    const val = evento.target.value;
    setOpcionSeleccionada(val);
    const unidad = form.unidades.find((un: any) => un.UnidadNegocio == val);
    if (unidad) {
      setForm((prev) => ({
        ...prev,
        tarifaBase: Number(unidad.Conceptos.find((x: any) => x.Id == 85347)?.Monto) || 0,
        gestionAdmin: Number(unidad.Conceptos.find((x: any) => x.Id == 85348)?.Monto) || 0,
        monitoreoVial: Number(unidad.Conceptos.find((x: any) => x.Id == 85414)?.Monto) || 0
      }));
    }
  };

  return (
    <div className="calculator-container">
      <h2>Calculadora de Envío de Contenedores</h2>
      <p className="subtitle">Calcula de forma rápida el costo total de tu logística con desglose de retenciones y moneda local (VES).</p>
      
      {/* Grid optimizado con mayor espacio para resultados */}
      <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '20px' }}>
        
        {/* Panel de Entradas */}
        <div className="card card-inputs" style={{ position: 'relative' }}>
          {loading && (
            <div className="spinner-overlay" style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(255,255,255,0.85)', display: 'flex',
              flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 10,
              borderRadius: '8px'
            }}>
              <div className="spinner" style={{
                width: '40px', height: '40px', border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db', borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ marginTop: '10px', fontWeight: '500', color: '#333' }}>Cargando tarifas y tasa BCV...</p>
            </div>
          )}

          <h3>Datos del Envío</h3>
          <hr />

          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

          <div className="form-group">
            <label htmlFor="localidad">Localidad de retiro:</label>
            <select id="localidad" value={opcionSeleccionada} onChange={manejarCambio} disabled={loading}>
              <option value="">-- Seleccione --</option>
              {form.unidades.map((unidad: any) => (
                <option key={unidad.id} value={unidad.UnidadNegocio}>
                  {unidad.DescripcionUnidNegocio}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="cantidad">Cantidad de Contenedores:</label>
            <input 
              id="cantidad"
              name="cantidad"
              type="number" 
              value={form.cantidad}
              onChange={handleChange}
              min="1" 
              placeholder="Ej. 1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tarifaBase">Tarifa Base por Contenedor ($):</label>
            <input 
              id="tarifaBase"
              name="tarifaBase"
              type="number" 
              value={form.tarifaBase}
              onChange={handleChange}
              min="0" 
              readOnly={true}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tasaBcv">Tasa $ BCV (Promedio):</label>
            <input 
              id="tasaBcv"
              name="tasaBcv"
              type="number" 
              step="0.0001"
              value={form.tasaBcv.toFixed(3)}
              onChange={handleChange}
              min="0" 
              readOnly={true}
            />
          </div>

          <div className="form-group">
            <label>Retención IVA (%):</label>
            <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'normal' }}>
                <input 
                  type="radio"
                  name="porcentajeRetencionIva"
                  value={75}
                  checked={form.porcentajeRetencionIva === 75}
                  onChange={handleChange}
                  style={{ marginRight: '6px' }}
                />
                75%
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'normal' }}>
                <input 
                  type="radio"
                  name="porcentajeRetencionIva"
                  value={100}
                  checked={form.porcentajeRetencionIva === 100}
                  onChange={handleChange}
                  style={{ marginRight: '6px' }}
                />
                100%
              </label>
            </div>
          </div>
        </div>

        {/* Panel de Resultados (Ampliado) */}
        <div className="card card-results">
          <h3>Resumen de Costos</h3>
          <hr />

          <div className="result-row">
            <span>Manejo Contenedores:</span>
            <strong>{formatMonedaUSD(subtotalContenedores)}</strong>
          </div>

          <div className="result-row">
            <span>Gestión Administrativa:</span>
            <span>{formatMonedaUSD(gestionAdminTotal)}</span>
          </div>

          <div className="result-row">
            <span>Monitoreo y Control Vial:</span>
            <span>{formatMonedaUSD(monitoreoVialTotal)}</span>
          </div>

          <div className="result-row">
            <span>IVA (16%):</span>
            <span>{formatMonedaUSD(vatUSD)}</span>
          </div>

          <hr style={{margin: '10px 0', borderColor: '#eee'}} />

          <div className="result-row text-muted">
            <span>Retención ISLR (2%):</span>
            <span style={{color: '#d9534f'}}>- {formatMonedaUSD(retencionIslrUSD)}</span>
          </div>

          <div className="result-row text-muted">
            <span>Retención IVA ({form.porcentajeRetencionIva}%):</span>
            <span style={{color: '#d9534f'}}>- {formatMonedaUSD(retencionIvaUSD)}</span>
          </div>

          <hr />

          <div className="result-row total-row">
            <span>Total USD (Sin Retención):</span>
            <span className="total-price">{formatMonedaUSD(totalSinRetencionUSD)}</span>
          </div>
          <div className="result-row total-row">
            <span>Total VES (Sin Retención):</span>
            <span className="total-price">{formatMonedaVES(totalSinRetencionVES)}</span>
          </div>

          <hr />

          <div className="result-row total-row" style={{marginTop: '10px'}}>
            <span>Total a Pagar USD (Con Retención):</span>
            <span className="total-price">{formatMonedaUSD(totalConRetencionUSD)}</span>
          </div>
          <div className="result-row total-row">
            <span>Total a Pagar VES (Con Retención):</span>
            <span className="total-price">{formatMonedaVES(totalConRetencionVES)}</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}