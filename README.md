# Comedores Oroba — Landing page

Sitio estático (HTML, CSS y JavaScript, sin dependencias ni compilación), listo para publicarse con **GitHub Pages** y un dominio propio.

```
index.html                 Página principal (7 secciones)
aviso-de-privacidad.html   Página del aviso (texto pendiente)
404.html                   Página de error
css/styles.css             Todos los estilos (colores en :root)
js/main.js                 Menú, animaciones y formulario
assets/img/                Fotografías (ver assets/img/LEEME.md)
robots.txt, sitemap.xml    SEO (cambiar "tudominio.com")
.nojekyll                  Indica a GitHub que sirva los archivos tal cual
```

Para verla en tu computadora: abre `index.html` con doble clic.

---

## 1. Subirla a GitHub

1. Entra a github.com → **New repository**. Nombre sugerido: `comedores-oroba`. Puede ser público (GitHub Pages gratis requiere repositorio público en cuentas gratuitas).
2. En el repositorio nuevo: **Add file → Upload files**, arrastra **el contenido** de esta carpeta (no la carpeta en sí) y presiona **Commit changes**.
   - Los archivos que empiezan con punto (`.nojekyll`) pueden no verse al arrastrar en Mac; si no aparece, créalo con **Add file → Create new file**, nombre `.nojekyll`, vacío.
3. **Settings → Pages** → *Source*: **Deploy from a branch** → Branch: `main`, carpeta `/ (root)` → **Save**.
4. En 1–2 minutos queda en `https://TU-USUARIO.github.io/comedores-oroba/`.

## 2. Conectar el dominio

1. Compra el dominio (Namecheap, Cloudflare, GoDaddy, Google/Squarespace, Neubox o Akky para `.mx`).
2. En GitHub: **Settings → Pages → Custom domain** → escribe `www.tudominio.com` → **Save**. (Esto crea un archivo `CNAME` en el repositorio; no lo borres.)
3. En el panel DNS de donde compraste el dominio, agrega:

| Tipo  | Nombre / Host | Valor                    |
|-------|---------------|--------------------------|
| A     | @             | 185.199.108.153          |
| A     | @             | 185.199.109.153          |
| A     | @             | 185.199.110.153          |
| A     | @             | 185.199.111.153          |
| CNAME | www           | TU-USUARIO.github.io     |

4. Espera a que propague (de minutos a 24 h). Luego, en **Settings → Pages**, activa **Enforce HTTPS**.
5. Busca y reemplaza `https://www.tudominio.com` por tu dominio real en `index.html`, `robots.txt` y `sitemap.xml`.

> Recomendado: en **Settings → Pages** usa la opción *Verify domain* para que nadie más pueda usar tu dominio en GitHub.

## 3. Conectar el formulario

GitHub Pages no procesa formularios, así que se usa un servicio externo. Mientras no esté conectado, el formulario **no envía nada** y se lo indica al visitante (no muestra un falso "enviado").

**Opción Formspree (gratis hasta 50 envíos/mes):**
1. Crea cuenta en formspree.io → **New form** → copia la URL (`https://formspree.io/f/xxxxxxx`).
2. En `index.html`, busca `data-endpoint=""` y pégala: `data-endpoint="https://formspree.io/f/xxxxxxx"`.
3. Sube el cambio. Haz un envío de prueba y confírmalo en el correo que te mande Formspree.

Funciona igual con Web3Forms, Getform o Basin (cualquier servicio que acepte `POST` y responda JSON). El campo oculto `_gotcha` ya sirve como filtro anti-spam en Formspree.

## 4. Pendientes antes de publicar

- [ ] Fotografías en `assets/img/` (nombres en `LEEME.md`).
- [ ] Texto del aviso de privacidad en `aviso-de-privacidad.html` (el formulario recoge datos personales, así que es necesario).
- [ ] URL del formulario (`data-endpoint`).
- [x] Dominio: www.orobacomedores.com (Cloudflare, archivo `CNAME`).
- [x] Logotipo integrado (archivos en `assets/logo/`: versión completa, emblema y nombre, en PNG y WebP con fondo transparente).

## Editar

- **Textos:** directo en `index.html`; cada sección tiene un comentario `<!-- 1. HERO -->`, `<!-- 2. NOSOTROS -->`, etc.
- **Colores y tipografías:** variables al inicio de `css/styles.css`.
- Cada cambio que subas a GitHub se publica solo en 1–2 minutos.
