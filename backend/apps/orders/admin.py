from django.contrib import admin
from .models import Order, OrderLine


class OrderLineInline(admin.TabularInline):
    model = OrderLine
    extra = 0
    readonly_fields = ('sku', 'name', 'qty', 'price', 'line_total')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('bill_no', 'user', 'status', 'amount', 'email', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('bill_no', 'email', 'name', 'idram_trans_id')
    inlines = [OrderLineInline]
    readonly_fields = ('bill_no', 'created_at', 'paid_at', 'idram_trans_id')