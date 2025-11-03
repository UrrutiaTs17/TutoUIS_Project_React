import { useEffect, useState } from 'react';
import './Home.css';

function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [codigo, setCodigo] = useState('');

  const API = 'http://localhost:8080/api/usuarios';

  const fetchUsuarios = () => {
    setLoading(true);
    fetch(API)
      .then((r) => r.json())
      .then((data) => {
        setUsuarios(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudo obtener usuarios');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const payload = { nombre, apellido, correo, contrasena, codigoEstudiantil: codigo };
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (res.ok) {
          setNombre(''); setApellido(''); setCorreo(''); setContrasena(''); setCodigo('');
          fetchUsuarios();
        } else {
          const err = await res.json().catch(() => ({}));
          alert(err.error || 'Error creando usuario');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('No se pudo conectar al servidor');
      });
  };

  const handleDelete = (id) => {
    if (!confirm('Eliminar usuario?')) return;
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.status === 204) fetchUsuarios();
        else alert('Error eliminando');
      })
      .catch(() => alert('No se pudo conectar al servidor'));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Usuarios</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-6">
          <h5>Crear Usuario</h5>
          <form onSubmit={handleCreate}>
            <div className="mb-2"><input className="form-control" placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} required/></div>
            <div className="mb-2"><input className="form-control" placeholder="Apellido" value={apellido} onChange={e=>setApellido(e.target.value)} required/></div>
            <div className="mb-2"><input type="email" className="form-control" placeholder="Correo" value={correo} onChange={e=>setCorreo(e.target.value)} required/></div>
            <div className="mb-2"><input className="form-control" placeholder="Contraseña" value={contrasena} onChange={e=>setContrasena(e.target.value)} required/></div>
            <div className="mb-2"><input className="form-control" placeholder="Código estudiantil" value={codigo} onChange={e=>setCodigo(e.target.value)}/></div>
            <button className="btn btn-success" type="submit">Crear</button>
          </form>
        </div>
        <div className="col-md-6">
          <h5>Lista</h5>
          {loading && <div>Cargando...</div>}
          {!loading && (
            <table className="table table-sm">
              <thead><tr><th>Nombre</th><th>Correo</th><th>Código</th><th>Acciones</th></tr></thead>
              <tbody>
                {usuarios.map(u=> (
                  <tr key={u.id}>
                    <td>{u.nombre} {u.apellido}</td>
                    <td>{u.correo}</td>
                    <td>{u.codigoEstudiantil}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(u.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
