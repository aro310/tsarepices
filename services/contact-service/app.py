"""
Ts'Art Épices — Contact Service
Gestion des messages de contact
Port: 5003
"""

import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, ContactMessage
from config import Config

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={r'/*': {'origins': '*'}})
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'contact-service', 'version': '1.0.0'})


@app.route('/messages', methods=['POST'])
def create_message():
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'error': 'Données manquantes'}), 400

    required_fields = ['name', 'email', 'subject', 'message']
    for field in required_fields:
        if not data.get(field, '').strip():
            return jsonify({'success': False, 'error': f'Champ requis: {field}'}), 400

    msg = ContactMessage(
        name=data['name'].strip(),
        email=data['email'].strip(),
        subject=data['subject'].strip(),
        message=data['message'].strip()
    )
    db.session.add(msg)
    db.session.commit()

    logger.info(f'Nouveau message de contact de {msg.name} ({msg.email}): {msg.subject}')

    return jsonify({
        'success': True,
        'message': 'Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
        'data': {'id': msg.id}
    }), 201


@app.route('/messages', methods=['GET'])
def get_messages():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify({
        'success': True,
        'data': [m.to_dict() for m in messages],
        'count': len(messages)
    })


@app.route('/messages/<int:msg_id>/read', methods=['PATCH'])
def mark_as_read(msg_id):
    msg = ContactMessage.query.get_or_404(msg_id)
    msg.read = True
    db.session.commit()
    return jsonify({'success': True, 'data': msg.to_dict()})


@app.errorhandler(404)
def not_found(error):
    return jsonify({'success': False, 'error': 'Non trouvé'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'success': False, 'error': 'Erreur interne'}), 500


if __name__ == '__main__':
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
