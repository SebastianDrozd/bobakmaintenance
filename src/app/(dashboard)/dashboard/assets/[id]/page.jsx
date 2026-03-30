"use client";

import {
  Factory,
  BadgeCheck,
  CalendarDays,
  ClipboardList,
  MapPin,
  ShieldCheck,
  Wrench,
  Camera,
  FileText,
  Settings,
} from "lucide-react";
import Image from "next/image";
import styles from "../../../../../styles/ViewAssetPage.module.css";

const IMAGE_BASE = "http://localhost:5159/uploads/";

const ViewAssetPage = () => {
  const asset = {
    id: 1,
    assetCode: "AST-1001",
    name: "Blast Chill Cooler",
    department: "Packaging",
    type: "Cooling",
    status: "Active",
    owner: "Uperez",
    location: "Packaging Line 2",
    manufacturer: "Hussmann",
    model: "BC-2200",
    serialNumber: "SN-BC-00921",
    purchaseDate: "2024-02-12",
    installDate: "2024-03-01",
    lastServiceDate: "2026-03-10",
    nextServiceDate: "2026-04-10",
    description:
      "Primary blast chill unit used in the packaging area. This asset is critical for production flow and requires regular inspection of fan assemblies, cooling coils, and door seals.",
    notes:
      "Asset has had two minor refrigeration-related work orders in the last six months. Monitor temperature consistency during peak production hours.",
    photos: [
      {
        id: 1,
        name: "blast-chill-front.jpg",
        path: "blast-chill-front.jpg",
      },
      {
        id: 2,
        name: "blast-chill-interior.jpg",
        path: "blast-chill-interior.jpg",
      },
    ],
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Factory size={22} />
            </div>

            <div>
              <p className={styles.eyebrow}>Assets</p>
              <h1 className={styles.title}>{asset.name}</h1>
              <p className={styles.subtitle}>
                Review asset details, service information, and related photos.
              </p>
            </div>
          </div>

          <div className={styles.headerActions}>
            <div
              className={`${styles.statusPill} ${
                asset.status === "Active"
                  ? styles.activeBadge
                  : asset.status === "Maintenance"
                  ? styles.maintenanceBadge
                  : styles.inactiveBadge
              }`}
            >
              {asset.status}
            </div>

            <button className={styles.primaryBtn}>Edit Asset</button>
          </div>
        </div>

        <div className={styles.detailsCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.sectionText}>
              Core asset information and operational details.
            </p>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <FileText size={16} />
                Asset Code
              </div>
              <div className={styles.infoValue}>{asset.assetCode}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <BadgeCheck size={16} />
                Status
              </div>
              <div className={styles.infoValue}>{asset.status}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <MapPin size={16} />
                Department
              </div>
              <div className={styles.infoValue}>{asset.department}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <Settings size={16} />
                Type
              </div>
              <div className={styles.infoValue}>{asset.type}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <ShieldCheck size={16} />
                Owner
              </div>
              <div className={styles.infoValue}>{asset.owner}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <MapPin size={16} />
                Location
              </div>
              <div className={styles.infoValue}>{asset.location}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <Factory size={16} />
                Manufacturer
              </div>
              <div className={styles.infoValue}>{asset.manufacturer}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <Wrench size={16} />
                Model
              </div>
              <div className={styles.infoValue}>{asset.model}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <ClipboardList size={16} />
                Serial Number
              </div>
              <div className={styles.infoValue}>{asset.serialNumber}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Purchase Date
              </div>
              <div className={styles.infoValue}>
                {new Date(asset.purchaseDate).toLocaleDateString()}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Install Date
              </div>
              <div className={styles.infoValue}>
                {new Date(asset.installDate).toLocaleDateString()}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Last Service Date
              </div>
              <div className={styles.infoValue}>
                {new Date(asset.lastServiceDate).toLocaleDateString()}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Next Service Date
              </div>
              <div className={styles.infoValue}>
                {new Date(asset.nextServiceDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.contentSection}>
            <div className={styles.block}>
              <div className={styles.blockLabel}>
                <ClipboardList size={16} />
                Description
              </div>
              <div className={styles.descriptionCard}>{asset.description}</div>
            </div>

            <div className={styles.block}>
              <div className={styles.blockLabel}>
                <FileText size={16} />
                Notes
              </div>
              <div className={styles.descriptionCard}>{asset.notes}</div>
            </div>

            <div className={styles.block}>
              <div className={styles.blockLabel}>
                <Camera size={16} />
                Photos
              </div>

              <div className={styles.photoGrid}>
                {asset.photos.map((photo) => (
                  <div key={photo.id} className={styles.photoCard}>
                    <div className={styles.photoImageWrap}>
                      <Image
                        unoptimized
                        src={IMAGE_BASE + photo.path}
                        fill
                        className={styles.photoImage}
                        alt={photo.name || "Asset photo"}
                      />
                    </div>

                    <div className={styles.photoMeta}>
                      <p className={styles.photoName}>{photo.name}</p>
                      <p className={styles.photoHint}>Attached asset photo</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.helperText}>
              This page provides a read-only view of the asset and its service details.
            </div>

            <div className={styles.buttonRow}>
              <button type="button" className={styles.secondaryBtn}>
                Back
              </button>
              <button type="button" className={styles.primaryBtn}>
                Edit Asset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAssetPage;