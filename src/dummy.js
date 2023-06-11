import { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import { getValue, setValue } from "./lodash";
// import { getLookupAPIs } from "./lookup-apis";
// import { QueryRequestHelper } from "common/query-request-helper";

const CustomSearchableDropdown = (props) => {
  const { label, id, value, searchLoading, removeClose, onChange } = props;

  /* -------------------------------------------------------------------------- */
  /*                               UseState Section                             */
  /* -------------------------------------------------------------------------- */
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputChange, setInputChange] = useState(false);
  const inputRef = useRef(null);
  /* -------------------------------------------------------------------------- */
  /*                               UseEffect Section                            */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    fetchDefaultData();
    document.addEventListener("click", toggle);
    // document.addEventListener("mouseup", toggle);
    return () => {
      document.removeEventListener("click", toggle);
      // document.addEventListener("mouseup", toggle);
    };
  }, []);

  useEffect(() => {
    setQuery("");
  }, [props.resetInput]);

  /* -------------------------------------------------------------------------- */
  /*                               Onchange section                             */
  /* -------------------------------------------------------------------------- */
  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const filter = (options) => {
    return getValue(options, `length`, 0) > 0
      ? options.filter(
          (option) =>
            getValue(option, `[${label}]`, "") &&
            option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      : [];
  };
  useEffect(() => {
    if (query) {
      setInputChange(true);
    }
  }, [query]);

  const [data, setData] = useState([
    {
      value: "sethu",
      name: "sethu",
      label: "sethu",
      id: 1,
    },
    {
      value: "raju",
      name: "raju",
      label: "raju",
      id: 2,
    },
    {
      value: "rock",
      name: "rock",
      label: "rock",
      id: 3,
    },
    {
      value: "rock1",
      name: "rock1",
      label: "rock1",
      id: 4,
    },

    {
      value: "rock2",
      name: "rock2",
      label: "rock2",
      id: 5,
    },
    {
      value: "rock3",
      name: "rock3",
      label: "rock3",
      id: 6,
    },
    {
      value: "rock4",
      name: "rock4",
      label: "rock4",
      id: 7,
    },
    {
      value: "rock5",
      name: "rock5",
      label: "rock5",
      id: 8,
    },
  ]);
  console.log(data, filter(data));
  const handleFetchData = async (search_text) => {
    // if (search_text)
    //   try {
    //     let payload = {
    //       search: search_text,
    //       page_no: 1,
    //       page_size: 10,
    //     };
    //     let queryRequest = QueryRequestHelper(payload);
    //     let resp = await getLookupAPIs(
    //       getValue(props, `lookup_api`, ""),
    //       queryRequest
    //     );
    //     if (resp) {
    //       let items =
    //         getValue(resp, `data.length`, 0) > 0
    //           ? getValue(resp, `data`, []).map((item) => ({
    //               id: getValue(item, `id`, ""),
    //               name:
    //                 getValue(item, `user.first_name`, "") +
    //                 " " +
    //                 getValue(item, `user.last_name`, ""),
    //               value:
    //                 getValue(item, `user.first_name`, "") +
    //                 " " +
    //                 getValue(item, `user.last_name`, ""),
    //               label:
    //                 getValue(item, `user.first_name`, "") +
    //                 " " +
    //                 getValue(item, `user.last_name`, ""),
    //               [label]:
    //                 getValue(item, `user.first_name`, "") +
    //                 " " +
    //                 getValue(item, `user.last_name`, ""),
    //             }))
    //           : [];
    //       setData(items);
    //     }
    //   } catch (error) {}
    // else onChange(null);
  };
  const fetchDefaultData = async () => {
    // try {
    //   let payload = {
    //     page_no: 1,
    //     page_size: 10,
    //   };
    //   let queryRequest = QueryRequestHelper(payload);
    //   let resp = await getLookupAPIs(
    //     getValue(props, `lookup_api`, ""),
    //     queryRequest
    //   );
    //   if (resp) {
    //     let items =
    //       getValue(resp, `data.length`, 0) > 0
    //         ? getValue(resp, `data`, []).map((item) => ({
    //             id: getValue(item, `id`, ""),
    //             name:
    //               getValue(item, `user.first_name`, "") +
    //               " " +
    //               getValue(item, `user.last_name`, ""),
    //             value:
    //               getValue(item, `user.first_name`, "") +
    //               " " +
    //               getValue(item, `user.last_name`, ""),
    //             label:
    //               getValue(item, `user.first_name`, "") +
    //               " " +
    //               getValue(item, `user.last_name`, ""),
    //             [label]:
    //               getValue(item, `user.first_name`, "") +
    //               " " +
    //               getValue(item, `user.last_name`, ""),
    //           }))
    //         : [];
    //     setData(items);
    //   }
    // } catch (error) {}
  };
  const findSelectedPipeline = (id) => {
    let list =
      getValue(data, `length`, 0) > 0
        ? data.filter((item) => getValue(item, `id`, "") === id)
        : [];

    return getValue(list, `length`, 0) > 0
      ? getValue(list, `[${0}].label`, "")
      : "";
  };
  const valueLabel = useMemo(() => findSelectedPipeline(value), [
    value,
    getValue(data, `length`, 0) > 0,
  ]);
  return (
    <>
      {/* <label style={{ fontSize: "15px", marginBottom: "3px" }}>{label}</label> */}
      <div className={"dropdownselect-form"}>
        <div className="control">
          <div className="selected-value">
            <input
              ref={inputRef}
              type="text"
              value={
                inputChange
                  ? query
                    ? query
                    : valueLabel
                  : valueLabel
                  ? valueLabel
                  : query
              }
              name="searchTerm"
              autoComplete="new-password"
              placeholder={getValue(props, `placeholder`, "Please Enter")}
              onChange={(e) => {
                setQuery(e.target.value);
                handleFetchData(e.target.value);
              }}
              onClick={toggle}
            />
          </div>
          {/* <div className="line"></div>
          {searchLoading ? (
            <div className="arrowtext">...</div>
          ) : (
            <div className={`arrow ${isOpen ? "open" : ""}`}></div>
          )}
          {(query || valueLabel) && !removeClose && (
            <div
              className="close"
              onClick={(e) => {
                setQuery("");
                handleFetchData("");
              }}
            >
              &#x2715;
            </div>
          )} */}
        </div>

        <div className={`options ${isOpen ? "open" : ""}`}>
          {filter(data).length > 0 ? (
            filter(data).map((option, index) => {
              return (
                <div>
                  <div
                    onClick={() => {
                      onChange && onChange(option);
                      setInputChange(false);
                    }}
                    className={`option ${
                      option.id === value ? "selected" : ""
                    }`}
                    key={`${id}-${index}`}
                  >
                    {option[label]}
                  </div>
                </div>
              );
            })
          ) : (
            <div className={`option `} style={{ textAlign: "center" }}>
              No Data Found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomSearchableDropdown;
