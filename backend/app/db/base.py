# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.models.user import User  # noqa
from app.models.trademark import Trademark  # noqa
from app.models.payment import Payment  # noqa
from app.models.document import Document  # noqa