import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Paperclip,
  Plane,
  Send,
  ShoppingBag,
  Upload,
  Users,
  Utensils,
  X,
  MapPin,
} from "lucide-react";
import "../styles/Expense.css";

function Expense() {
  const projectOptions = [
    { value: "a", label: "Website Development" },
    { value: "b", label: "Mobile App Development" },
    { value: "c", label: "API Integration" },
    { value: "d", label: "Client Meeting" },
    { value: "e", label: "General Operations" },
  ];

  const [expenseType, setExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [project, setProject] = useState("");
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [travelPurpose, setTravelPurpose] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDays, setTravelDays] = useState("");
  const [mealType, setMealType] = useState("");
  const [attendees, setAttendees] = useState("");
  const [mealBusinessPurpose, setMealBusinessPurpose] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [distanceMiles, setDistanceMiles] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [yearPickerOpen, setYearPickerOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const initialDate = new Date();
    initialDate.setDate(1);
    initialDate.setHours(0, 0, 0, 0);
    return initialDate;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const datePickerRef = useRef(null);
  const projectSelectRef = useRef(null);
  const mileageRate = 0.67;
  const mileageTotal = (Number.parseFloat(distanceMiles) || 0) * mileageRate;

  const toggleExpenseType = (type) => {
    setExpenseType((prevType) => (prevType === type ? "" : type));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2),
      file,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!datePickerRef.current?.contains(event.target)) {
        setCalendarOpen(false);
        setYearPickerOpen(false);
      }
      if (!projectSelectRef.current?.contains(event.target)) {
        setProjectMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const parseISODate = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatISODate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateValue = parseISODate(selectedDate);

  const formatDateDisplay = (date) => {
    if (!date) return "MM/DD/YYYY";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleOpenCalendar = () => {
    setCalendarOpen(true);
    setYearPickerOpen(false);
    if (selectedDateValue) {
      const nextVisibleMonth = new Date(selectedDateValue);
      nextVisibleMonth.setDate(1);
      setVisibleMonth(nextVisibleMonth);
    }
  };

  const handleSelectDate = (date) => {
    if (date > today) return;
    setSelectedDate(formatISODate(date));
    setCalendarOpen(false);
    setYearPickerOpen(false);
  };

  const changeMonth = (offset) => {
    setYearPickerOpen(false);
    setVisibleMonth((prev) => {
      const next = new Date(prev.getFullYear(), prev.getMonth() + offset, 1);
      return next > new Date(today.getFullYear(), today.getMonth(), 1)
        ? new Date(today.getFullYear(), today.getMonth(), 1)
        : next;
    });
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthLabel = visibleMonth.toLocaleDateString("en-US", { month: "short" });
  const currentYear = today.getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, index) => currentYear - index,
  );

  const firstDayOfMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1,
  );
  const calendarStartDate = new Date(firstDayOfMonth);
  calendarStartDate.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStartDate);
    date.setDate(calendarStartDate.getDate() + index);
    const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
    const isSelected =
      selectedDateValue && formatISODate(date) === formatISODate(selectedDateValue);
    const isToday = formatISODate(date) === formatISODate(today);
    const isFuture = date > today;

    return {
      key: formatISODate(date),
      date,
      label: date.getDate(),
      isCurrentMonth,
      isSelected,
      isToday,
      isFuture,
    };
  });

  const selectedProjectLabel =
    projectOptions.find((option) => option.value === project)?.label ||
    "Select project";

  const resetExpenseForm = () => {
    setExpenseType("");
    setAmount("");
    setProject("");
    setProjectMenuOpen(false);
    setDescription("");
    setSelectedDate("");
    setUploadedFiles([]);
    setTravelPurpose("");
    setFromCity("");
    setToCity("");
    setTravelDays("");
    setMealType("");
    setAttendees("");
    setMealBusinessPurpose("");
    setStartLocation("");
    setEndLocation("");
    setDistanceMiles("");
    setCalendarOpen(false);
    setYearPickerOpen(false);
  };

  const handleSubmitExpense = async () => {
    setIsSubmitting(true);
    setSubmitMessage("");
    await new Promise((resolve) => setTimeout(resolve, 500));
    resetExpenseForm();
    setSubmitMessage("Expense draft saved (frontend-only mode).");
    setIsSubmitting(false);
  };

  return (
    <div className="expense-page-bg">
      <div className="expense-form-card">
        <h2>Expense Type</h2>
        <div className="type-list">
          <div
            className={`type-item ${expenseType === "travel" ? "active" : ""}`}
            onClick={() => toggleExpenseType("travel")}
          >
            <Plane size={18} />
            <div>
              <strong>Travel</strong>
              <p>Flights, hotels, transportation</p>
            </div>
          </div>
          <div
            className={`type-item ${expenseType === "meals" ? "active" : ""}`}
            onClick={() => toggleExpenseType("meals")}
          >
            <Utensils size={18} />
            <div>
              <strong>Meals</strong>
              <p>Business meals & entertainment</p>
            </div>
          </div>
          <div
            className={`type-item ${expenseType === "supplies" ? "active" : ""}`}
            onClick={() => toggleExpenseType("supplies")}
          >
            <ShoppingBag size={18} />
            <div>
              <strong>Supplies</strong>
              <p>Office & work supplies</p>
            </div>
          </div>
          <div
            className={`type-item ${expenseType === "mileage" ? "active" : ""}`}
            onClick={() => toggleExpenseType("mileage")}
          >
            <Car size={18} />
            <div>
              <strong>Mileage</strong>
              <p>Vehicle mileage reimbursement</p>
            </div>
          </div>
        </div>

        <label>Expense Date</label>
        <div className="date-input-container" ref={datePickerRef}>
          <button type="button" className="date-display dropdown" onClick={handleOpenCalendar}>
            <span className="date-display-left">
              <Calendar size={18} />
              <span>{formatDateDisplay(selectedDateValue)}</span>
            </span>
          </button>
          {calendarOpen && (
            <div className="custom-calendar">
              <div className="calendar-header">
                <button type="button" className="calendar-nav-btn" onClick={() => changeMonth(-1)}>
                  <ChevronLeft size={14} />
                </button>
                <div className="calendar-title-group">
                  <span className="calendar-month-label">{monthLabel}</span>
                  <button
                    type="button"
                    className="calendar-year-btn"
                    onClick={() => setYearPickerOpen((prev) => !prev)}
                  >
                    <span>{visibleMonth.getFullYear()}</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
                <button
                  type="button"
                  className="calendar-nav-btn"
                  onClick={() => changeMonth(1)}
                  disabled={
                    visibleMonth.getFullYear() === today.getFullYear() &&
                    visibleMonth.getMonth() === today.getMonth()
                  }
                >
                  <ChevronRight size={14} />
                </button>
              </div>

              {yearPickerOpen && (
                <div className="calendar-year-list">
                  {yearOptions.map((year) => (
                    <button
                      key={year}
                      type="button"
                      className={[
                        "calendar-year-option",
                        year === visibleMonth.getFullYear() && "active",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => {
                        setVisibleMonth(new Date(year, visibleMonth.getMonth(), 1));
                        setYearPickerOpen(false);
                      }}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}

              <div className="calendar-weekdays">
                {weekDays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="calendar-grid">
                {calendarDays.map((day) => (
                  <button
                    key={day.key}
                    type="button"
                    className={[
                      "calendar-day",
                      !day.isCurrentMonth && "muted",
                      day.isSelected && "selected",
                      day.isToday && "today",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleSelectDate(day.date)}
                    disabled={day.isFuture}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {expenseType === "travel" && (
          <div className="travel-details-card">
            <div className="travel-details-title">
              <Plane size={16} />
              <h3>Travel Details</h3>
            </div>
            <label>Travel Purpose</label>
            <select value={travelPurpose} onChange={(e) => setTravelPurpose(e.target.value)}>
              <option value="">Select purpose</option>
              <option value="client-meeting">Client meeting</option>
              <option value="conference-training">Conference/Training</option>
              <option value="site-visit">Site visit</option>
              <option value="other">Other</option>
            </select>
            <div className="travel-locations">
              <div>
                <label>From</label>
                <div className="location-input">
                  <MapPin size={16} />
                  <input type="text" placeholder="City" value={fromCity} onChange={(e) => setFromCity(e.target.value)} />
                </div>
              </div>
              <div>
                <label>To</label>
                <div className="location-input">
                  <MapPin size={16} />
                  <input type="text" placeholder="City" value={toCity} onChange={(e) => setToCity(e.target.value)} />
                </div>
              </div>
            </div>
            <label>Number of Days</label>
            <div className="days-input">
              <Clock3 size={16} />
              <input type="number" min="1" placeholder="Number of days" value={travelDays} onChange={(e) => setTravelDays(e.target.value)} />
            </div>
          </div>
        )}

        {expenseType === "meals" && (
          <div className="meal-details-card">
            <div className="meal-details-title">
              <Utensils size={16} />
              <h3>Meal Details</h3>
            </div>
            <label>Meal Type</label>
            <div className="meal-type-options">
              {["breakfast", "lunch", "dinner", "client-entertainment"].map((m) => (
                <button key={m} type="button" className={`meal-type-btn ${mealType === m ? "active" : ""}`} onClick={() => setMealType(m)}>
                  {m.replace("-", " ")}
                </button>
              ))}
            </div>
            <label>Attendees</label>
            <div className="attendees-input">
              <Users size={16} />
              <input type="text" placeholder="Names of attendees" value={attendees} onChange={(e) => setAttendees(e.target.value)} />
            </div>
            <label>Business Purpose</label>
            <textarea value={mealBusinessPurpose} onChange={(e) => setMealBusinessPurpose(e.target.value)} rows="4" />
          </div>
        )}

        {expenseType === "mileage" && (
          <div className="mileage-details-card">
            <div className="mileage-details-title">
              <Car size={16} />
              <h3>Mileage Details</h3>
            </div>
            <div className="mileage-locations">
              <div>
                <label>Start Location</label>
                <div className="location-input">
                  <MapPin size={16} />
                  <input type="text" placeholder="From" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} />
                </div>
              </div>
              <div>
                <label>End Location</label>
                <div className="location-input">
                  <MapPin size={16} />
                  <input type="text" placeholder="To" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} />
                </div>
              </div>
            </div>
            <label>Distance (miles)</label>
            <input type="number" min="0" step="0.1" value={distanceMiles} onChange={(e) => setDistanceMiles(e.target.value)} />
            <div className="mileage-summary-field">
              <span className="mileage-rate-text">Rate: $0.67/mile</span>
              <span className="mileage-total">${mileageTotal.toFixed(2)}</span>
            </div>
          </div>
        )}

        {expenseType !== "mileage" && (
          <>
            <label>Amount</label>
            <div className="amount-box">
              <span>$</span>
              <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} step="0.01" min="0" />
            </div>
          </>
        )}

        <label>Project / Cost Center</label>
        <div className="custom-select" ref={projectSelectRef}>
          <button type="button" className={["custom-select-trigger", projectMenuOpen && "open"].filter(Boolean).join(" ")} onClick={() => setProjectMenuOpen((prev) => !prev)}>
            <span>{selectedProjectLabel}</span>
            <ChevronDown size={14} />
          </button>
          {projectMenuOpen && (
            <div className="custom-select-menu">
              {projectOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={["custom-select-option", project === option.value && "selected"].filter(Boolean).join(" ")}
                  onClick={() => {
                    setProject(option.value);
                    setProjectMenuOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" />

        <label>Receipt Upload</label>
        <label className="upload-area">
          <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFileUpload} />
          <Upload className="upload-icon" size={24} />
          <p className="upload-line">Tap to upload or drag and drop</p>
          <span className="upload-hint">Photos of receipts or PDF invoices</span>
        </label>

        {uploadedFiles.length > 0 && (
          <div className="uploaded-files">
            <h4>Uploaded Files ({uploadedFiles.length})</h4>
            {uploadedFiles.map((file) => (
              <div key={file.id} className="file-item">
                <div className="file-info">
                  <Paperclip size={15} />
                  <div>
                    <strong>{file.name}</strong>
                    <span>{file.size} KB</span>
                  </div>
                </div>
                <button className="remove-file-btn" onClick={() => removeFile(file.id)} type="button">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <button className="submit-expense" type="button" onClick={handleSubmitExpense} disabled={isSubmitting}>
          <Send className="send-icon" size={18} />
          <span>{isSubmitting ? "Submitting..." : "Submit Expense Claim"}</span>
        </button>
        {submitMessage && <p className="submit-status">{submitMessage}</p>}
      </div>
    </div>
  );
}

export default Expense;
