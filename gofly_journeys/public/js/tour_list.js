frappe.provide("gofly.common");

(function() {
    // Define the common navigation menu
    const navMenu = [
        { label: "🏖️ Tour Package", route: "List/Tour Package" },
        { label: "🧳 Travel Plan", route: "List/Travel Plan" },
        { label: "👥 Customer", route: "List/Customer" },
        { label: "🧍 Staff", route: "List/Staff" },
        { label: "🧭 Guide", route: "List/Guide" },
        { label: "📦 Booking", route: "List/Booking" },
        { label: "💳 Payment", route: "List/Payment" },
        { label: "🗂️ Tour Staff Assignment", route: "List/Tour Staff Assignment" }
    ];

    // Patch ListView.make_page to inject this dropdown in every list view
    const patch_listview = () => {
        if (!frappe.views || !frappe.views.ListView) {
            console.warn("⚠️ frappe.views.ListView not loaded yet.");
            return;
        }

        const original = frappe.views.ListView.prototype.make_page;

        frappe.views.ListView.prototype.make_page = function() {
            // Call original method first
            original.apply(this, arguments);

            // Prevent duplicate menu creation
            if (this.page._gofly_nav_added) return;
            this.page._gofly_nav_added = true;

            const group_label = "Navigate";

            // Add menu buttons
            navMenu.forEach(item => {
                this.page.add_inner_button(item.label, () => {
                    frappe.set_route(item.route);
                }, group_label);
            });

            console.log(`✅ Gofly Navigation added for ${this.doctype}`);
        };

        console.log("✨ Gofly global ListView navigation initialized.");
    };

    // Wait for Frappe to be ready
    frappe.ready(() => {
        patch_listview();
    });
})();
