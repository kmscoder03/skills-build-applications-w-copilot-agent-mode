from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete existing data
        User.objects.all().delete()
        # Sample users
        users = [
            User(username='ironman', email='ironman@marvel.com'),
            User(username='captainamerica', email='cap@marvel.com'),
            User(username='batman', email='batman@dc.com'),
            User(username='superman', email='superman@dc.com'),
        ]
        for user in users:
            user.save()
        self.stdout.write(self.style.SUCCESS('Users populated.'))
        # TODO: Add teams, activities, leaderboard, workouts
        self.stdout.write(self.style.SUCCESS('Sample teams, activities, leaderboard, and workouts should be added here.'))
