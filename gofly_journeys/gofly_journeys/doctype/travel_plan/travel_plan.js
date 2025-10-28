frappe.ui.form.on('Travel Plan', {
    refresh(frm) {
        gofly.common.add_open_related_button(frm);
    },

    to_airport(frm) {
        if (frm.doc.to_airport) {
            // Copy related field values
            frm.set_value('pickup', frm.doc.to_airport);
            frm.set_value('travel_date', frm.doc.arrival_date);
            frm.set_value('departure_date', frm.doc.travel_start_date);
            frm.set_value('return_departure_date', frm.doc.travel_end_date);
        } else {
            // Clear fields if to_airport is empty
            frm.set_value('pickup', '');
            frm.set_value('travel_date', '');
            frm.set_value('departure_date', '');
            frm.set_value('return_departure_date', '');
        }
    }
});
