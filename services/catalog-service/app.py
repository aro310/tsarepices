"""
Ts'Art Épices — Catalog Service
Gestion des produits vanille de Madagascar
Port: 5001
"""

import json
import os
from flask import Flask, jsonify, abort
from flask_cors import CORS
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={r'/*': {'origins': '*'}})

# Chemin vers les données produits
DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'products.json')


def load_products():
    """Charge les produits depuis le fichier JSON."""
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'ok', 'service': 'catalog-service', 'version': '1.0.0'})


@app.route('/products', methods=['GET'])
def get_products():
    """Retourne la liste de tous les produits."""
    products = load_products()
    return jsonify({
        'success': True,
        'data': products,
        'count': len(products)
    })


@app.route('/products/featured', methods=['GET'])
def get_featured_products():
    """Retourne uniquement les produits mis en avant."""
    products = load_products()
    featured = [p for p in products if p.get('featured', False)]
    return jsonify({
        'success': True,
        'data': featured,
        'count': len(featured)
    })


@app.route('/products/format/<format_type>', methods=['GET'])
def get_products_by_format(format_type):
    """Filtre les produits par format (poids ou tube)."""
    products = load_products()
    filtered = [p for p in products if p.get('format') == format_type]
    return jsonify({
        'success': True,
        'data': filtered,
        'count': len(filtered)
    })


@app.route('/products/<slug>', methods=['GET'])
def get_product(slug):
    """Retourne un produit par son slug."""
    products = load_products()
    product = next((p for p in products if p['slug'] == slug), None)
    if not product:
        abort(404)
    return jsonify({
        'success': True,
        'data': product
    })


@app.errorhandler(404)
def not_found(error):
    return jsonify({'success': False, 'error': 'Produit non trouvé'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'success': False, 'error': 'Erreur interne du serveur'}), 500


if __name__ == '__main__':
    app.run(
        host=Config.HOST,
        port=Config.PORT,
        debug=Config.DEBUG
    )
