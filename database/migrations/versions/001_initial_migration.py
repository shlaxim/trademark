"""Initial migration

Revision ID: 001
Revises: 
Create Date: 2023-12-01 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Create user table
    op.create_table(
        'user',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('full_name', sa.String(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.Column('is_superuser', sa.Boolean(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_index(op.f('ix_user_id'), 'user', ['id'], unique=False)
    op.create_index(op.f('ix_user_full_name'), 'user', ['full_name'], unique=False)

    # Create trademark table
    op.create_table(
        'trademark',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('type', sa.Enum('WORD', 'FIGURATIVE', 'COMBINED', 'THREE_DIMENSIONAL', 'SOUND', 'COLOR', 'OTHER', name='trademarktype'), nullable=False),
        sa.Column('status', sa.Enum('DRAFT', 'SUBMITTED', 'UNDER_EXAMINATION', 'PUBLISHED', 'REGISTERED', 'REJECTED', 'ABANDONED', 'EXPIRED', name='trademarkstatus'), nullable=True),
        sa.Column('owner_id', sa.String(), nullable=False),
        sa.Column('application_number', sa.String(), nullable=True),
        sa.Column('registration_number', sa.String(), nullable=True),
        sa.Column('filing_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('registration_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('expiration_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('nice_classes', sa.JSON(), nullable=True),
        sa.Column('goods_services', sa.Text(), nullable=True),
        sa.Column('jurisdiction', sa.String(), nullable=False),
        sa.Column('image_url', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_trademark_application_number'), 'trademark', ['application_number'], unique=False)
    op.create_index(op.f('ix_trademark_id'), 'trademark', ['id'], unique=False)
    op.create_index(op.f('ix_trademark_name'), 'trademark', ['name'], unique=False)
    op.create_index(op.f('ix_trademark_registration_number'), 'trademark', ['registration_number'], unique=False)

    # Create payment table
    op.create_table(
        'payment',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('trademark_id', sa.String(), nullable=True),
        sa.Column('amount', sa.Numeric(precision=10, scale=2), nullable=False),
        sa.Column('currency', sa.String(), nullable=False),
        sa.Column('status', sa.Enum('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', name='paymentstatus'), nullable=False),
        sa.Column('type', sa.Enum('FILING_FEE', 'SEARCH_FEE', 'EXAMINATION_FEE', 'REGISTRATION_FEE', 'RENEWAL_FEE', 'OTHER', name='paymenttype'), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('stripe_payment_intent_id', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['trademark_id'], ['trademark.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_payment_id'), 'payment', ['id'], unique=False)
    op.create_index(op.f('ix_payment_stripe_payment_intent_id'), 'payment', ['stripe_payment_intent_id'], unique=False)

    # Create document table
    op.create_table(
        'document',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('trademark_id', sa.String(), nullable=True),
        sa.Column('filename', sa.String(), nullable=False),
        sa.Column('original_filename', sa.String(), nullable=False),
        sa.Column('file_path', sa.String(), nullable=False),
        sa.Column('file_size', sa.Integer(), nullable=False),
        sa.Column('content_type', sa.String(), nullable=False),
        sa.Column('document_type', sa.Enum('LOGO', 'POWER_OF_ATTORNEY', 'PRIORITY_DOCUMENT', 'SPECIMEN', 'CERTIFICATE', 'OTHER', name='documenttype'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['trademark_id'], ['trademark.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_document_id'), 'document', ['id'], unique=False)


def downgrade():
    op.drop_index(op.f('ix_document_id'), table_name='document')
    op.drop_table('document')
    op.drop_index(op.f('ix_payment_stripe_payment_intent_id'), table_name='payment')
    op.drop_index(op.f('ix_payment_id'), table_name='payment')
    op.drop_table('payment')
    op.drop_index(op.f('ix_trademark_registration_number'), table_name='trademark')
    op.drop_index(op.f('ix_trademark_name'), table_name='trademark')
    op.drop_index(op.f('ix_trademark_id'), table_name='trademark')
    op.drop_index(op.f('ix_trademark_application_number'), table_name='trademark')
    op.drop_table('trademark')
    op.drop_index(op.f('ix_user_full_name'), table_name='user')
    op.drop_index(op.f('ix_user_id'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')