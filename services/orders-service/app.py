"""
Ts'Art Épices — Orders Service
Gestion des commandes via WhatsApp + historique
Port: 5002
"""

from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from models import db, Order
from config import Config
from urllib.parse import quote

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={r'/*': {'origins': '*'}})
db.init_app(app)

# Numéro WhatsApp Ts'Art Épices (extrait du ticket.pdf)
WHATSAPP_NUMBER = '261379246750'


with app.app_context():
    db.create_all()


def generate_whatsapp_message(product_name: str, weight: str, quantity: int, notes: str = '') -> str:
    """Génère le message pré-rempli pour WhatsApp."""
    msg = f"Bonjour Ts'Art Épices ! 👋\n\n"
    msg += f"Je souhaite commander :\n"
    msg += f"• Produit : {product_name}\n"
    msg += f"• Format : {weight}\n"
    msg += f"• Quantité : {quantity}\n"
    if notes:
        msg += f"• Notes : {notes}\n"
    msg += f"\nMerci de me confirmer la disponibilité et le prix. 🙏"
    return msg


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'orders-service', 'version': '1.0.0'})


@app.route('/orders', methods=['POST'])
def create_order():
    """Enregistre une demande de commande et génère le lien WhatsApp."""
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'error': 'Données manquantes'}), 400

    required_fields = ['product_slug', 'product_name', 'product_weight']
    for field in required_fields:
        if field not in data:
            return jsonify({'success': False, 'error': f'Champ requis manquant: {field}'}), 400

    quantity = data.get('quantity', 1)
    whatsapp_msg = generate_whatsapp_message(
        data['product_name'],
        data['product_weight'],
        quantity,
        data.get('notes', '')
    )

    order = Order(
        product_slug=data['product_slug'],
        product_name=data['product_name'],
        product_weight=data['product_weight'],
        quantity=quantity,
        customer_name=data.get('customer_name'),
        customer_phone=data.get('customer_phone'),
        customer_email=data.get('customer_email'),
        notes=data.get('notes'),
        whatsapp_message=whatsapp_msg,
        status='pending'
    )

    db.session.add(order)
    db.session.commit()

    # Génère le lien WhatsApp
    whatsapp_link = f"https://wa.me/{WHATSAPP_NUMBER}?text={quote(whatsapp_msg)}"

    return jsonify({
        'success': True,
        'data': {
            'order': order.to_dict(),
            'whatsapp_link': whatsapp_link,
            'whatsapp_message': whatsapp_msg
        }
    }), 201


@app.route('/orders', methods=['GET'])
def get_orders():
    """Liste toutes les commandes (admin)."""
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify({
        'success': True,
        'data': [o.to_dict() for o in orders],
        'count': len(orders)
    })


@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """Détail d'une commande."""
    order = Order.query.get_or_404(order_id)
    return jsonify({'success': True, 'data': order.to_dict()})


@app.route('/orders/<int:order_id>/status', methods=['PATCH'])
def update_order_status(order_id):
    """Met à jour le statut d'une commande."""
    order = Order.query.get_or_404(order_id)
    data = request.get_json()
    valid_statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
    new_status = data.get('status')
    if new_status not in valid_statuses:
        return jsonify({'success': False, 'error': 'Statut invalide'}), 400
    order.status = new_status
    db.session.commit()
    return jsonify({'success': True, 'data': order.to_dict()})


@app.route('/whatsapp-link', methods=['POST'])
def get_whatsapp_link():
    """Génère un lien WhatsApp sans enregistrer de commande."""
    data = request.get_json()
    msg = generate_whatsapp_message(
        data.get('product_name', 'Vanille Bourbon de Madagascar'),
        data.get('product_weight', ''),
        data.get('quantity', 1),
        data.get('notes', '')
    )
    link = f"https://wa.me/{WHATSAPP_NUMBER}?text={quote(msg)}"
    return jsonify({'success': True, 'whatsapp_link': link, 'message': msg})


@app.errorhandler(404)
def not_found(error):
    return jsonify({'success': False, 'error': 'Non trouvé'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'success': False, 'error': 'Erreur interne'}), 500


if __name__ == '__main__':
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
