from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Order(db.Model):
    """Modèle de commande WhatsApp."""
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    product_slug = db.Column(db.String(100), nullable=False)
    product_name = db.Column(db.String(200), nullable=False)
    product_weight = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    customer_name = db.Column(db.String(100), nullable=True)
    customer_phone = db.Column(db.String(50), nullable=True)
    customer_email = db.Column(db.String(150), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    whatsapp_message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default='pending')  # pending, confirmed, shipped, delivered
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'product_slug': self.product_slug,
            'product_name': self.product_name,
            'product_weight': self.product_weight,
            'quantity': self.quantity,
            'customer_name': self.customer_name,
            'customer_phone': self.customer_phone,
            'customer_email': self.customer_email,
            'notes': self.notes,
            'whatsapp_message': self.whatsapp_message,
            'status': self.status,
            'created_at': self.created_at.isoformat()
        }
