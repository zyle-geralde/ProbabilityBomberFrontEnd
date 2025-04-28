import { useEffect, useState } from 'react';
import { useShowStudents, useRemoveStudentFromClass } from '../../../hooks/UseTeacher';

function RemoveStudentFromClass({ className }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { students, loading: loadingStudents } = useShowStudents(className, refreshKey);
  // const {success, loading: removing} = useRemoveStudentFromClass(className, selectedStudent)
  const {remove, loading: removing, success, reset} = useRemoveStudentFromClass()

  useEffect(() => {
    if (success) {
      setRefreshKey(prev => prev + 1); // This causes useShowStudents to refetch
      setSelectedStudent(null); // Clear Selection
      reset();
    }
  }, [success]);

  const handleRemove = (student) => {
    setSelectedStudent(student);
    remove(className, student);
  };

  return (
    <div>
      {loadingStudents ? (
        <p>Loading students...</p>
      ) : (
        <table>
          <thead>
              <tr>
                  <th>Students in {className}</th>
                  <th>Score 1</th>
                  <th>Score 2</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
                <tr key={index}>
                  <td>{student}</td>
                  <td>95</td>
                  <td>95</td>
                  <td><button onClick={() => handleRemove(student)} disabled={removing && selectedStudent === student}>
                    {removing && student === selectedStudent ? "Deleting..." : "Delete"}
                  </button></td>
                </tr>
              ))}
              <tr><td>Alice Johnson</td><td>88</td><td>92</td><td><button>Drop Student</button></td></tr>
              <tr><td>Brian Smith</td><td>75</td><td>81</td><td><button>Drop Student</button></td></tr>
              <tr><td>Carla Martinez</td><td>90</td><td>85</td><td><button>Drop Student</button></td></tr>
              <tr><td>Daniel Wu</td><td>67</td><td>73</td><td><button>Drop Student</button></td></tr>
              <tr><td>Ella Brown</td><td>95</td><td>97</td><td><button>Drop Student</button></td></tr>
              <tr><td>Felix Turner</td><td>78</td><td>80</td><td><button>Drop Student</button></td></tr>
              <tr><td>Grace Lee</td><td>84</td><td>88</td><td><button>Drop Student</button></td></tr>
              <tr><td>Henry Adams</td><td>72</td><td>69</td><td><button>Drop Student</button></td></tr>
              <tr><td>Isabella Wright</td><td>91</td><td>93</td><td><button>Drop Student</button></td></tr>
              <tr><td>Jack Patel</td><td>83</td><td>86</td><td><button>Drop Student</button></td></tr>
          </tbody>
      </table>
      )}
      
    </div>
  );
}
export default RemoveStudentFromClass;