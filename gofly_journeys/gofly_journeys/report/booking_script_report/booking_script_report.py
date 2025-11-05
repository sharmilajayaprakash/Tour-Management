import frappe
from frappe import _
 
def execute(filters=None):
    if not filters:
        filters = {}
 
    columns = get_columns()
    data = get_data(filters)
    chart = get_chart_data(data)
 
    return columns, data, None, chart  # <== chart added here
 
 
def get_columns():
    return [
        {"label": _("Booking No"), "fieldname": "name", "fieldtype": "Link", "options": "Booking", "width": 150},
        {"label": _("Customer"), "fieldname": "customer", "fieldtype": "Link", "options": "Customer", "width": 180},
        {"label": _("Tour Package"), "fieldname": "tour_package_name", "fieldtype": "Data", "width": 200},
        {"label": _("Country"), "fieldname": "package_country", "fieldtype": "Data", "width": 120},
        {"label": _("Travel Date"), "fieldname": "travel_date", "fieldtype": "Date", "width": 120},
        {"label": _("Return Date"), "fieldname": "return_date", "fieldtype": "Date", "width": 120},
        {"label": _("Booking Status"), "fieldname": "booking_status", "fieldtype": "Data", "width": 130},
        {"label": _("Amount"), "fieldname": "amount", "fieldtype": "Currency", "width": 120},
    ]
 
 
def get_data(filters):
    conditions = []
    values = {}
 
    if filters.get("booking_status"):
        conditions.append("booking_status = %(booking_status)s")
        values["booking_status"] = filters["booking_status"]
 
    if filters.get("customer"):
        conditions.append("customer = %(customer)s")
        values["customer"] = filters["customer"]
 
    if filters.get("from_date") and filters.get("to_date"):
        conditions.append("travel_date BETWEEN %(from_date)s AND %(to_date)s")
        values["from_date"] = filters["from_date"]
        values["to_date"] = filters["to_date"]
 
    where_clause = "WHERE " + " AND ".join(conditions) if conditions else ""
 
    data = frappe.db.sql(f"""
        SELECT
            name,
            customer,
            tour_package_name,
            package_country,
            travel_date,
            return_date,
            booking_status,
            amount
        FROM `tabBooking`
        {where_clause}
        ORDER BY modified DESC
    """, values, as_dict=True)
 
    return data
 
 
def get_chart_data(data):
    """Generate a bar chart showing total amount by booking status"""
 
    if not data:
        return {}
 
    # group total amount by booking status
    totals = {}
    for row in data:
        status = row.get("booking_status") or "Unknown"
        totals[status] = totals.get(status, 0) + (row.get("amount") or 0)
 
    labels = list(totals.keys())
    values = list(totals.values())
 
    chart = {
        "data": {
            "labels": labels,
            "datasets": [
                {"name": "Total Amount", "values": values}
            ]
        },
        "type": "bar",  # can be "line", "pie", etc.
        "colors": ["#008FFB"]
    }
 
    return chart