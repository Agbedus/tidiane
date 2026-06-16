from app import create_app
from app.models import db, Event, Book, Photo
from app.services import create_event, create_book, create_photo
from datetime import datetime, timezone

app = create_app()

with app.app_context():
    db.create_all()

    if not Event.query.first():
        create_event(
            title="African Space Agency Inaugural Assembly",
            day="15",
            month_year="March 2025",
            location="Cairo, Egypt",
            description="First plenary session of the African Space Agency's governing council, setting the strategic roadmap for 2025–2030.",
            date=datetime(2025, 3, 15, tzinfo=timezone.utc),
        )
        create_event(
            title="UN Committee on the Peaceful Uses of Outer Space",
            day="22",
            month_year="April 2025",
            location="Vienna, Austria",
            description="Delivered Africa's unified position on space debris mitigation and shared access to orbital slots.",
            date=datetime(2025, 4, 22, tzinfo=timezone.utc),
        )
        create_event(
            title="Africa Space Summit 2025",
            day="10",
            month_year="June 2025",
            location="Addis Ababa, Ethiopia",
            description="Keynote address on Earth observation infrastructure for climate resilience across the Sahel.",
            date=datetime(2025, 6, 10, tzinfo=timezone.utc),
        )
        create_event(
            title="ESA–Africa Cooperation Forum",
            day="8",
            month_year="September 2024",
            location="Toulouse, France",
            description="Signed joint declaration on satellite data sharing for agricultural monitoring and disaster response.",
            date=datetime(2024, 9, 8, tzinfo=timezone.utc),
        )
        create_event(
            title="International Astronautical Congress",
            day="2",
            month_year="October 2024",
            location="Milan, Italy",
            description="Presented Africa's satellite constellation strategy and secured commitments from three international partners.",
            date=datetime(2024, 10, 2, tzinfo=timezone.utc),
        )
        create_event(
            title="AU Extraordinary Summit on Space Policy",
            day="18",
            month_year="November 2024",
            location="Accra, Ghana",
            description="Adoption of the African Space Agency's first five-year work plan by the African Union heads of state.",
            date=datetime(2024, 11, 18, tzinfo=timezone.utc),
        )

    if not Book.query.first():
        create_book(
            title="Space &amp; Sovereignty",
            subtitle="Africa's Path to Independence in the Final Frontier",
            status="Published · 2023",
            description="A visionary treatise on how space technology can transform African economies, strengthen governance, and secure the continent's place in the global space community.",
            publisher_info="Oxford University Press · ISBN 978-0-19-887452-1",
            buy_link="https://global.oup.com",
            cover_image_class="bc-1",
            is_authored=True,
        )
        create_book(
            title="The Sahel from Above",
            subtitle="Earth Observation for Land Degradation Monitoring",
            status="Published · 2019",
            description="A technical volume detailing remote sensing methodologies for monitoring desertification, agricultural productivity, and water resources across the Sahel region.",
            publisher_info="Springer Nature · ISBN 978-3-030-22456-7",
            buy_link="https://link.springer.com",
            cover_image_class="bc-2",
            is_authored=True,
        )
        create_book(
            title="African Space Futures",
            subtitle="Policy, Strategy, and the Next Frontier",
            status="Forthcoming · 2025",
            description="An edited collection bringing together leading African voices on space law, satellite regulation, and the socio-economic case for a continental space programme.",
            publisher_info="African Union Press · Forthcoming",
            buy_link="#",
            cover_image_class="bc-3",
            is_authored=True,
        )

    if not Photo.query.first():
        create_photo(
            image_path="assets/images/tidiane-gallery-01.jpg",
            caption="Dr. Ouattara addressing the African Union Assembly on space policy, Addis Ababa.",
            span_two=True,
            is_featured=True,
        )
        create_photo(
            image_path="assets/images/tidiane-gallery-02.jpg",
            caption="Tour of the Egyptian Space Agency ground station, Cairo.",
            span_two=False,
            is_featured=True,
        )
        create_photo(
            image_path="assets/images/tidiane-gallery-03.avif",
            caption="Signing the ESA–Africa data-sharing agreement, Toulouse.",
            span_two=False,
        )
        create_photo(
            image_path="assets/images/tidiane-gallery-04.avif",
            caption="Keynote at the International Astronautical Congress, Milan.",
            span_two=True,
        )
        create_photo(
            image_path="assets/images/tidiane-gallery-05.avif",
            caption="Field visit to satellite training facility, Nairobi.",
            span_two=False,
        )
        create_photo(
            image_path="assets/images/tidiane-gallery-06.avif",
            caption="Panel discussion on space law and governance, Kigali.",
            span_two=False,
        )
        create_photo(
            image_path="assets/images/tidiane-gallery-07.avif",
            caption="Meeting with JAXA delegation on Earth observation collaboration, Tokyo.",
            span_two=False,
        )
        create_photo(
            image_path="assets/images/tidiane-gallery-08.jpg",
            caption="Inaugural African Space Agency council session, Cairo.",
            span_two=False,
        )
        create_photo(
            image_path="assets/images/tidiane-gallery-09.jpg",
            caption="Workshop on satellite data for agricultural resilience, Dakar.",
            span_two=False,
        )
        create_photo(
            image_path="assets/images/tidiane-gallery-10.jpg",
            caption="Dr. Ouattara with African Union Commissioner for Education, Science, and Technology.",
            span_two=True,
        )
        create_photo(
            image_path="assets/images/tidiane-gallery-11.jpg",
            caption="Inspection of nanosatellite assembly lab, University of Cape Town.",
            span_two=False,
        )
        create_photo(
            image_path="assets/images/tidiane-gallery-12.jpg",
            caption="Press conference announcing Africa's first regional space strategy, Accra.",
            span_two=False,
        )

    print("Database seeded successfully!")
    print(f"  Events: {Event.query.count()}")
    print(f"  Books:  {Book.query.count()}")
    print(f"  Photos: {Photo.query.count()}")
