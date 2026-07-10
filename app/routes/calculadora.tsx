import React, { useState, useEffect, useMemo } from 'react';
import '../styles/calculadora.css'; // Si prefieres separar los estilos

export default function CalculadoraEnvio() {
  // Estado para controlar los campos del formulario
  const [form, setForm] = useState({
    cantidad: 1,
    tarifaBase: 0,
    seguro: 0,
    aduana: 0,
    transporteTerrestre: 0
  });

  // Estados para manejar la carga y posibles errores de la API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Consultar las tarifas al cargar el componente
  useEffect(() => {
    const consultarTarifas = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/tarifa');
        
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        const tarifa = data.datos.find((item: any) => item.Concepto == 85347);
        console.log("Tarifa encontrada:", tarifa);
        // Mapeamos los datos de la API al estado del formulario, manteniendo la cantidad en 1
        setForm((prev) => ({
          ...prev,
          tarifaBase: Number(tarifa?.Monto) || 0,
          seguro: Number(data.seguro) || 0,
          aduana: Number(data.aduana) || 0,
          transporteTerrestre: Number(data.transporteTerrestre) || 0
        }));
        setError(null);
      } catch (err) {
        console.error("Error cargando las tarifas de Taurel:", err);
        // setError("No se pudieron precargar las tarifas automáticas. Puedes ingresarlas manualmente.");
      } finally {
        setLoading(false);
      }
    };

    consultarTarifas();
  }, []); // Array vacío para que solo se ejecute una vez al montar el componente

  // Manejador genérico para actualizar los inputs numéricos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value === '' ? '' : Number(value)
    }));
  };

  // useMemo para calcular el costo base (Cantidad x Tarifa) sin recalcular en renders innecesarios
  const costoBaseTotal = useMemo(() => {
    const cantidad = form.cantidad > 0 ? form.cantidad : 0;
    const tarifa = form.tarifaBase > 0 ? form.tarifaBase : 0;
    return cantidad * tarifa;
  }, [form.cantidad, form.tarifaBase]);

  // useMemo para calcular el Gran Total sumando los adicionales
  const costoTotal = useMemo(() => {
    const seguro = form.seguro > 0 ? form.seguro : 0;
    const aduana = form.aduana > 0 ? form.aduana : 0;
    const terrestre = form.transporteTerrestre > 0 ? form.transporteTerrestre : 0;

    return costoBaseTotal + seguro + aduana + terrestre;
  }, [costoBaseTotal, form.seguro, form.aduana, form.transporteTerrestre]);

  // Función auxiliar para dar formato de moneda
  const formatMoneda = (valor: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(valor || 0);
  };

  return (
    
    <div className="calculator-container">
        {loading && <p>Cargando tarifas automáticas...</p>}
      <h2>Calculadora de Envío de Contenedores</h2>
      <p className="subtitle">Calcula de forma rápida el costo total de tu logística de exportación/importación.</p>
      
      <div className="grid-layout">
        {/* Panel de Entradas (Formulario) */}
        <div className="card card-inputs">
          <h3>Datos del Envío</h3>
          <hr />
          
          <div className="form-group">
            <label htmlFor="cantidad">Cantidad de Contenedores:</label>
            <input 
              id="cantidad"
              name="cantidad"
              type="number" 
              value={form.cantidad}
              onChange={handleChange}
              min="1" 
              placeholder="Ej. 5"
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
              placeholder="Ej. 1800"
            />
          </div>

          {/* Costos Adicionales Opcionales */}
          {/* <h3 className="section-title">Costos Adicionales (Opcional)</h3>
          <hr />

          <div className="form-group">
            <label htmlFor="seguro">Seguro del Envío ($):</label>
            <input 
              id="seguro"
              name="seguro"
              type="number" 
              value={form.seguro}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="aduana">Gastos de Aduana / Aranceles ($):</label>
            <input 
              id="aduana"
              name="aduana"
              type="number" 
              value={form.aduana}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="transporteTerrestre">Transporte Terrestre Posterior ($):</label>
            <input 
              id="transporteTerrestre"
              name="transporteTerrestre"
              type="number" 
              value={form.transporteTerrestre}
              onChange={handleChange}
              min="0"
            />
          </div> */}
        </div>

        {/* Panel de Resultados */}
        <div className="card card-results">
          <h3>Resumen de Costos</h3>
          <hr />

          <div className="result-row">
            <span>Subtotal Contenedores ({form.cantidad || 0} x {formatMoneda(form.tarifaBase)}):</span>
            <strong>{formatMoneda(costoBaseTotal)}</strong>
          </div>

          <div className="result-row">
            <span>Seguro:</span>
            <span>{formatMoneda(form.seguro)}</span>
          </div>

          <div className="result-row">
            <span>Aduana / Tasas:</span>
            <span>{formatMoneda(form.aduana)}</span>
          </div>

          <div className="result-row mb-2">
            <span>Flete Terrestre:</span>
            <span>{formatMoneda(form.transporteTerrestre)}</span>
          </div>

          <hr />

          <div className="result-row total-row">
            <span>Costo Total Estimado:</span>
            <span className="total-price">{formatMoneda(costoTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}