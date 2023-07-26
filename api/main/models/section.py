from django.db import models

class Section(models.Model):
    slug = models.SlugField(max_length=100, primary_key=True)
    title = models.CharField(max_length=100)
    order = models.IntegerField(default=1)

    class Meta:
        ordering = ['order']

    # Auto increment the order field
    def save(self, *args, **kwargs):
        # This means that the model isn't saved to the database yet
        if self._state.adding:
            # Get the maximum order value from the database
            last_id = Section.objects.all().aggregate(largest=models.Max('order'))['largest']

            # aggregate can return None! Check it first.
            # If it isn't none, just use the last ID specified (which should be the greatest) and add one to it
            if last_id is not None:
                self.order = last_id + 1

        super(Section, self).save(*args, **kwargs)
