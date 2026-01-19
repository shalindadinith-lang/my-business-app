import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [businessName, setBusinessName] = useState('ඔබේ ව්‍යාපාරයේ නාමය');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [products, setProducts] = useState([]);
  const [previewHtml, setPreviewHtml] = useState('');

  // Logo preview locally
  useEffect(() => {
    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(logoFile);
    } else {
      setLogoPreview('');
    }
  }, [logoFile]);

  // Generate simple static preview HTML
  useEffect(() => {
    let html = `
      <!DOCTYPE html>
      <html lang="si">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${businessName}</title>
        <style>
          body { font-family: Arial; text-align: center; padding: 20px; background: #f8f9fa; }
          img { max-width: 180px; margin: 20px auto; }
          h1 { color: #2c3e50; }
          table { width: 100%; max-width: 600px; margin: 20px auto; border-collapse: collapse; }
          th, td { padding: 12px; border: 1px solid #ddd; }
          th { background: #343a40; color: white; }
        </style>
      </head>
      <body>
        ${logoPreview ? `<img src="${logoPreview}" alt="Logo">` : ''}
        <h1>${businessName}</h1>
        <h2>නිෂ්පාදන ලැයිස්තුව</h2>
        <table>
          <thead>
            <tr><th>නම</th><th>මිල (LKR)</th></tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td>${p.name || 'නමක් නැහැ'}</td>
                <td>${p.price ? Number(p.price).toLocaleString() : '0'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    setPreviewHtml(html);
  }, [businessName, logoPreview, products]);

  const addProduct = () => {
    setProducts([...products, { name: '', price: '' }]);
  };

  const updateProduct = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const generateApk = () => {
    alert("මේක static version එකක් නිසා full APK build එක තවම නැහැ.\nඔයාට ඕන නම් Vercel / Render වගේ platform එකකට full app එක දාන්න පුළුවන්!");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Online App Builder</h1>

      <div style={{ marginBottom: '25px' }}>
        <label style={{ fontSize: '18px', fontWeight: 'bold' }}>ව්‍යාපාර නාමය:</label><br />
        <input
          type="text"
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
          style={{ width: '100%', maxWidth: '500px', padding: '12px', marginTop: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '25px' }}>
        <label style={{ fontSize: '18px', fontWeight: 'bold' }}>ලෝගෝ:</label><br />
        <input
          type="file"
          accept="image/*"
          onChange={e => setLogoFile(e.target.files[0] || null)}
          style={{ marginTop: '8px' }}
        />
        {logoPreview && <img src={logoPreview} alt="Preview" style={{ maxWidth: '150px', marginTop: '10px' }} />}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>නිෂ්පාදන එකතු කරන්න</h2>
        {products.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="නිෂ්පාදන නම"
              value={p.name}
              onChange={e => updateProduct(i, 'name', e.target.value)}
              style={{ flex: 1, padding: '10px' }}
            />
            <input
              type="number"
              placeholder="මිල (LKR)"
              value={p.price}
              onChange={e => updateProduct(i, 'price', e.target.value)}
              style={{ width: '140px', padding: '10px' }}
            />
            <button
              onClick={() => removeProduct(i)}
              style={{ background: '#e74c3c', color: 'white', padding: '10px 16px', border: 'none' }}
            >
              ඉවත් කරන්න
            </button>
          </div>
        ))}
        <button
          onClick={addProduct}
          style={{ background: '#3498db', color: 'white', padding: '12px 20px', border: 'none' }}
        >
          + නිෂ්පාදනයක් එකතු කරන්න
        </button>
      </div>

      <h2 style={{ textAlign: 'center' }}>Preview</h2>
      <iframe
        srcDoc={previewHtml}
        style={{ width: '100%', height: '600px', border: '2px solid #3498db', borderRadius: '8px' }}
      />

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={generateApk}
          style={{ background: '#27ae60', color: 'white', padding: '16px 40px', fontSize: '18px', border: 'none', borderRadius: '8px' }}
        >
          ZIP Download කරලා APK හදාගන්න (Static Demo)
        </button>
      </div>
    </div>
  );
}

export default App;