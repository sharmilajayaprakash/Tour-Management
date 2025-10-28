frappe.provide("gofly.common");

gofly.common.add_open_related_button = function (frm) {
    // Avoid adding duplicate buttons every refresh
    frm.page.clear_custom_actions();

    // Create an "Open Related" dropdown group
    const group_label = 'Open Related';

    const related_links = [
        { label: 'Staff', doctype: 'Staff' },
        { label: 'Tour Package', doctype: 'Tour Package' },
        { label: 'Customer', doctype: 'Customer' },
        { label: 'Booking', doctype: 'Booking' },
        { label: 'Payment', doctype: 'Payment' },
        { label: 'Guide', doctype: 'Guide' },
        { label: 'Tour Staff Assignment', doctype: 'Tour Staff Assignment' },
        { label: 'Travel Plan', doctype: 'Travel Plan' },
    ];

    // Loop through the list and add each button
    related_links.forEach(link => {
        frm.page.add_inner_button(link.label, () => {
            frappe.set_route('List', link.doctype);
        }, group_label);
    });
};
